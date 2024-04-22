export const handleBGClr = (priority) => {
  switch (priority) {
    case 0:
      return "yellow";
    case 1:
      return "orange";
    case 2:
      return "red";
    default:
      return "yellow";
  }
};

export const handleStatus = (status) => {
  switch (status) {
    case 0:
      return "Not Started";
    case 1:
      return "In Progress";
    case 2:
      return "Completed";
    default:
      return "Not Started";
  }
};
