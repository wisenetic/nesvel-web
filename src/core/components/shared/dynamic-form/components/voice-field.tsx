import React, { useState, useRef, useEffect } from 'react';
import { useFormContext } from 'react-hook-form';
import { IFieldConfig } from '../interfaces/field-config.interface';
import { FieldWrapper } from './field-wrapper';
import { Button } from '@/core/components/ui/button';
import { Mic, Square, Pause, Play, Trash2, FileAudio } from 'lucide-react';
import { cn } from '@/core/lib/utils';

/**
 * Configuration options for the VoiceField.
 */
export interface VoiceFieldOptions {
  /**
   * Whether to enable real-time transcription using Web Speech API.
   * @default false
   */
  transcribe?: boolean;

  /**
   * Language for transcription (e.g., 'en-US').
   * @default 'en-US'
   */
  language?: string;

  /**
   * Maximum recording duration in seconds.
   * @default 60
   */
  maxDuration?: number;
}

/**
 * Props for the VoiceField component.
 */
interface VoiceFieldProps {
  config: IFieldConfig;
}

/**
 * A voice input field that allows recording audio and optional transcription.
 * Uses MediaRecorder API for audio capture and Web Speech API for transcription.
 * 
 * @param {VoiceFieldProps} props - The component props.
 * @returns {JSX.Element} The rendered voice recorder field.
 */
export const VoiceField: React.FC<VoiceFieldProps> = ({ config }) => {
  const { setValue, watch, formState: { errors } } = useFormContext();
  const { name, label, description, required, componentProps } = config;
  
  const options: VoiceFieldOptions = componentProps || {};
  const transcribe = options.transcribe ?? false;
  const language = options.language || 'en-US';
  const maxDuration = options.maxDuration || 60;

  const value = watch(name); // Expected format: { audioBlob: Blob, transcript: string, audioUrl: string }

  const [isRecording, setIsRecording] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [duration, setDuration] = useState(0);
  const [transcriptText, setTranscriptText] = useState('');
  
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const recognitionRef = useRef<any>(null);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      if (value?.audioUrl) URL.revokeObjectURL(value.audioUrl);
      stopRecognition();
    };
  }, []);

  // Initialize Speech Recognition
  useEffect(() => {
    if (transcribe && 'webkitSpeechRecognition' in window) {
      const SpeechRecognition = (window as any).webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = true;
      recognitionRef.current.interimResults = true;
      recognitionRef.current.lang = language;

      recognitionRef.current.onresult = (event: any) => {
        let finalTranscript = '';
        for (let i = event.resultIndex; i < event.results.length; ++i) {
          if (event.results[i].isFinal) {
            finalTranscript += event.results[i][0].transcript;
          }
        }
        if (finalTranscript) {
          setTranscriptText(prev => {
            const newText = prev ? `${prev} ${finalTranscript}` : finalTranscript;
            // Update form value with new transcript immediately if we already have audio (unlikely during recording) 
            // or just local state until recording stops.
            return newText;
          });
        }
      };
    }
  }, [transcribe, language]);

  const startTimer = () => {
    timerRef.current = setInterval(() => {
      setDuration(prev => {
        if (prev >= maxDuration) {
          stopRecording();
          return prev;
        }
        return prev + 1;
      });
    }, 1000);
  };

  const stopTimer = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };

  const startRecognition = () => {
    if (recognitionRef.current) {
      try {
        recognitionRef.current.start();
      } catch (e) {
        console.error('Speech recognition start failed', e);
      }
    }
  };

  const stopRecognition = () => {
    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch (e) {
        // Ignore errors if already stopped
      }
    }
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);
      chunksRef.current = [];

      mediaRecorderRef.current.ondataavailable = (e) => {
        if (e.data.size > 0) {
          chunksRef.current.push(e.data);
        }
      };

      mediaRecorderRef.current.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: 'audio/webm' });
        const audioUrl = URL.createObjectURL(blob);
        
        // Update form value
        setValue(name, {
          audioBlob: blob,
          audioUrl: audioUrl,
          transcript: transcriptText
        }, { shouldValidate: true, shouldDirty: true });
        
        // Stop all tracks
        stream.getTracks().forEach(track => track.stop());
      };

      mediaRecorderRef.current.start();
      setIsRecording(true);
      setIsPaused(false);
      setDuration(0);
      setTranscriptText('');
      startTimer();
      if (transcribe) startRecognition();

    } catch (err) {
      console.error('Error accessing microphone:', err);
      alert('Could not access microphone. Please ensure permissions are granted.');
    }
  };

  const pauseRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      if (isPaused) {
        mediaRecorderRef.current.resume();
        startTimer();
        if (transcribe) startRecognition();
        setIsPaused(false);
      } else {
        mediaRecorderRef.current.pause();
        stopTimer();
        if (transcribe) stopRecognition();
        setIsPaused(true);
      }
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      stopTimer();
      if (transcribe) stopRecognition();
      setIsRecording(false);
      setIsPaused(false);
    }
  };

  const clearRecording = () => {
    setValue(name, null, { shouldValidate: true, shouldDirty: true });
    setTranscriptText('');
    setDuration(0);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <FieldWrapper
      label={label}
      id={name}
      error={errors[name]?.message as string}
      description={description}
      required={required}
      className={config.className}
    >
      <div className="space-y-4">
        {!value ? (
          <div className="flex items-center gap-4 p-4 border rounded-md bg-muted/20">
            {isRecording ? (
              <>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500 animate-pulse" />
                  <span className="font-mono text-sm">{formatTime(duration)} / {formatTime(maxDuration)}</span>
                </div>
                
                <div className="flex-1" />

                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  onClick={pauseRecording}
                  title={isPaused ? "Resume" : "Pause"}
                >
                  {isPaused ? <Play className="h-4 w-4" /> : <Pause className="h-4 w-4" />}
                </Button>

                <Button
                  type="button"
                  variant="destructive"
                  size="icon"
                  onClick={stopRecording}
                  title="Stop & Save"
                >
                  <Square className="h-4 w-4 fill-current" />
                </Button>
              </>
            ) : (
              <Button
                type="button"
                variant="secondary"
                className="w-full gap-2"
                onClick={startRecording}
              >
                <Mic className="h-4 w-4" />
                Start Recording
              </Button>
            )}
          </div>
        ) : (
          <div className="space-y-3 p-4 border rounded-md">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-sm font-medium">
                <FileAudio className="h-4 w-4 text-primary" />
                <span>Audio Recording</span>
              </div>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="text-destructive hover:text-destructive"
                onClick={clearRecording}
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Delete
              </Button>
            </div>

            {value.audioUrl && (
              <audio controls src={value.audioUrl} className="w-full h-10" />
            )}

            {transcribe && (
              <div className="space-y-1">
                <label className="text-xs font-medium text-muted-foreground">Transcript</label>
                <div className="p-3 bg-muted rounded-md text-sm min-h-[60px]">
                  {value.transcript || transcriptText || <span className="text-muted-foreground italic">No transcript available</span>}
                </div>
              </div>
            )}
          </div>
        )}
        
        {/* Live Transcript Preview during recording */}
        {isRecording && transcribe && transcriptText && (
          <div className="p-3 bg-muted/50 rounded-md text-sm animate-in fade-in">
            <p className="text-xs font-medium text-muted-foreground mb-1">Live Transcript:</p>
            {transcriptText}
          </div>
        )}
      </div>
    </FieldWrapper>
  );
};
