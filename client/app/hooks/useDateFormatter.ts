const useDateFormatter = () => {
  const formatDOB = (dateString: string | null | undefined): string => {
    if (!dateString) return "Not set";

    try {
      const parts = dateString.split("T")[0].split("-");
      const date = new Date(
        Number(parts[0]),
        Number(parts[1]) - 1,
        Number(parts[2])
      );

      return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "numeric",
        day: "numeric",
      });
    } catch (error) {
      return dateString;
    }
  };

  return { formatDOB };
};

export default useDateFormatter;
