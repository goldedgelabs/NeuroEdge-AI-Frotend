/**
 * useAgentEngine (standalone runner)
 * Simulates multi-step agent reasoning chain and calls back with steps.
 *
 * Signature:
 *  runAgentChain({ agent, input, onStep }) => Promise
 *
 * Produces 4-6 simulated steps with small delays to mimic streaming reasoning.
 *
 * Replace internals later to call your real GoldEdge engine adapter.
 */

function sleep(ms) {
  return new Promise((res) => setTimeout(res, ms));
}

export default async function runAgentChain({ agent, input, onStep = () => {} }) {
  // Build a simulated set of reasoning steps based on agent type
  const base = [
    { label: "Understand", text: `Interpreting the user request: "${input.prompt || ""}"` },
    { label: "Plan", text: "Building a plan: identify sub-tasks and approach." },
    {
      label: "Research",
      text: "Gathering supporting facts (simulated). Searching internal knowledgebase...",
    },
    { label: "Execute", text: `Executing the plan using the ${agent.name} persona.` },
    { label: "Synthesize", text: "Synthesizing final answer and formatting output." },
  ];

  // Agent-specific augmentations
  if (agent.id === "coder") {
    base.splice(2, 0, { label: "Analyze Code", text: "Analyzing code structure & dependencies." });
  } else if (agent.id === "researcher") {
    base.splice(3, 0, { label: "Cite Sources", text: "Collecting and formatting citations." });
  } else if (agent.id === "writer") {
    base.splice(2, 0, { label: "Tone & Structure", text: "Choosing tone and outline." });
  }

  const total = base.length;

  for (let i = 0; i < total; i++) {
    const step = base[i];
    // call callback with (step, index, total)
    onStep({ label: step.label, text: step.text, action: step.action || null }, i, total);

    // simulate variable latency
    await sleep(700 + Math.random() * 700);
  }

  // final extra output step
  onStep(
    {
      label: "Result",
      text: `Final ${agent.name} output (simulated). Replace with GoldEdge engine output later.`,
      action: "result",
    },
    total,
    total + 1
  );
  await sleep(200);
       }
