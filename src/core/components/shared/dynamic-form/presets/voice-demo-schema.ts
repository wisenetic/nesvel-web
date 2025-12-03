import { form } from '../builder/form-builder';
import { field } from '../builder/field-builder';

/**
 * Demo schema showcasing the Voice Input field.
 * This form demonstrates recording and transcription capabilities.
 */
export const voiceDemoSchema = form({
  // Basic voice input for short text
  name: field.voice({
    label: 'Speak your Name',
    description: 'Click the microphone to start recording your name.',
    voiceOptions: {
      transcribe: true,
      language: 'en-US',
      maxDuration: 10, // 10 seconds max
    },
    required: true,
  }),

  // Voice input for longer description (textarea style)
  bio: field.voice({
    label: 'Tell us about yourself',
    description: 'Record a short bio. You can pause and resume.',
    voiceOptions: {
      transcribe: true,
      language: 'en-US',
      maxDuration: 60, // 1 minute max
    },
    componentProps: {
      rows: 4, // Render as textarea
    },
  }),

  // Voice input without transcription (audio only)
  feedback: field.voice({
    label: 'Audio Feedback',
    description: 'Leave us a voice message (audio only, no text).',
    voiceOptions: {
      transcribe: false,
      maxDuration: 30,
    },
  }),
}).withFormMeta({
  title: 'Voice Input Demo',
  description: 'Experience the power of voice-enabled forms.',
  submitButton: {
    text: 'Submit Voice Data',
  },
});
