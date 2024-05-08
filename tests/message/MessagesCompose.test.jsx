import { describe, it, vi, expect } from "vitest";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import MessagesCompose from "@/Components/messages/MessagesCompose";

vi.mock("@/services/Requests", () => ({
  postRequest: vi.fn(),
}));

describe("MessagesCompose Component", () => {
  it("displays form elements", async () => {
    const { getByText } = render(<MessagesCompose />);

    const toInputLabel = getByText("to");
    const subjectInputLabel = getByText("subject");
    const messageInputLabel = getByText("message");
    const sendButton = getByText("send");

    expect(toInputLabel).toBeInTheDocument();
    expect(subjectInputLabel).toBeInTheDocument();
    expect(messageInputLabel).toBeInTheDocument();
    expect(sendButton).toBeInTheDocument();
  });
});
