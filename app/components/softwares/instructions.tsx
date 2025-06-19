interface InstructionsProps {
  instructions: string | string[] | { step: string; order: number }[];
}

const Instructions: React.FC<InstructionsProps> = ({ instructions }) => {
  let displayInstructions: string[] = [];

  if (Array.isArray(instructions)) {
    if (typeof instructions[0] === "object") {
      // Case: array of { step, order }
      displayInstructions = (instructions as { step: string; order: number }[])
        .sort((a, b) => a.order - b.order)
        .map((item) => item.step);
    } else {
      // Case: array of plain strings
      displayInstructions = instructions as string[];
    }
  } else if (typeof instructions === "string") {
    // Case: plain string — split by newlines
    displayInstructions = instructions
      .split("\n")
      .map((line) => line.trim())
      .filter(Boolean);
  }

  // Detect if steps are already numbered
  const alreadyNumbered = displayInstructions.every((step) =>
    /^\d+\.\s/.test(step)
  );

  const formatted = !alreadyNumbered
    ? displayInstructions.map((step, idx) => `${idx + 1}. ${step}`).join("\n")
    : displayInstructions.join("\n");

  return (
    <textarea
      readOnly
      value={formatted || "No available instructions."}
      rows={Math.max(4, displayInstructions.length)}
      className="w-full border p-2 bg-gray-50 text-sm text-gray-800 rounded resize-none"
    />
  );
};

export default Instructions;
