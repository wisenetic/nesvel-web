export default {
  location: {
    title: "Locations",
    list_title: "Locations",
    list_description: "Manage sites, buildings, floors, and zones.",
    loading: "Loading locations...",
    types: {
      site: "Site",
      building: "Building",
      floor: "Floor",
      zone: "Zone",
    },
    empty: {
      title: "No locations defined",
      description: "Use your backend or seeding to add sites, buildings, and zones.",
    },
    form: {
      create_title: "Add Location",
      edit_title: "Edit Location",
      create_subtitle: "Create a new site, building, floor, or zone.",
      edit_subtitle: "Update location details and hierarchy.",
      create_submit: "Create",
      edit_submit: "Save changes",
      fields: {
        name: "Name",
        type: "Type",
        parent: "Parent",
      },
      placeholders: {
        name: "Building A - Floor 1",
        type: "Select type",
        parent: "Select parent (optional)",
      },
      parent: {
        root: "No parent (Site)",
      },
      validation: {
        name_required: "Name is required",
      },
    },
    details: {
      empty_title: "Select a location",
      empty_description:
        "Choose a site, building, floor, or zone from the tree to see details.",
      add_child: "Add child",
      fields: {
        id: "ID",
        type: "Type",
        depth: "Depth",
        order: "Order",
      },
      delete_confirm_title: "Delete location",
      delete_confirm_message:
        "Are you sure you want to delete this location? This will remove it from the hierarchy for this session.",
      delete_confirm_cancel: "Cancel",
      delete_confirm_confirm: "Delete",
    },
  },
};
