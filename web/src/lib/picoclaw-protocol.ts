// What PicoClaw's pico channel puts in the payload of a message, as far as the chat needs it.

export type GatewayToolCall = {
  id: string;
  // the name of the tool, such as mcp_nanokvm_kvm_actions
  name: string;
  // a preview of the arguments, cut after a few hundred characters, so not always valid JSON
  arguments: string;
  // the agent's own one line on why it makes the call
  explanation?: string;
};

export type GatewayMessageKind = 'text' | 'thought' | 'tool_calls';

export function messageKindOf(payload: Record<string, unknown>): GatewayMessageKind {
  const kind = typeof payload.kind === 'string' ? payload.kind.trim().toLowerCase() : '';
  if (kind === 'tool_calls') {
    return 'tool_calls';
  }
  // older servers marked a thought with a boolean
  if (kind === 'thought' || payload.thought === true) {
    return 'thought';
  }
  return 'text';
}

export function toolCallsFromPayload(payload: Record<string, unknown>): GatewayToolCall[] {
  const calls = payload.tool_calls;
  if (!Array.isArray(calls)) {
    return [];
  }

  return calls.flatMap((raw, index) => {
    if (!raw || typeof raw !== 'object') {
      return [];
    }
    const call = raw as Record<string, unknown>;
    const fn = (call.function || {}) as Record<string, unknown>;
    const extra = (call.extra_content || {}) as Record<string, unknown>;
    const explanation =
      typeof extra.tool_feedback_explanation === 'string'
        ? extra.tool_feedback_explanation.trim()
        : '';

    return [
      {
        id: typeof call.id === 'string' && call.id ? call.id : String(index),
        name: typeof fn.name === 'string' ? fn.name : '',
        arguments: typeof fn.arguments === 'string' ? fn.arguments : '',
        explanation: explanation || undefined
      }
    ];
  });
}
