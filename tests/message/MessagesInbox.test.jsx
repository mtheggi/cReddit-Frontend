import { describe, it, vi, expect } from "vitest";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import MessagesInbox from "@/Components/messages/MessagesInbox";

vi.mock("@/services/Requests", () => ({
  deleteRequest: vi.fn(),
  patchRequest: vi.fn(),
}));

describe("MessagesInbox Component", () => {
  it("renders inbox message correctly", () => {
    const messageData = {
      id: "1",
      from: "sender1",
      to: "receiver1",
      subject: "Test Subject",
      text: "Test message",
      isRead: false,
      isDeleted: false,
      createdAt: "2024-05-05T12:00:00Z",
    };

    const { getByText } = render(<MessagesInbox {...messageData} />);

    const subjectText = getByText("Test Subject");
    const fromText = getByText("from /u/sender1");
    const toText = getByText("to /u/receiver1");
    const messageText = getByText("Test message");
    const deleteButton = getByText("Delete");
    const markReadButton = getByText("Mark Read");

    expect(subjectText).toBeInTheDocument();
    expect(fromText).toBeInTheDocument();
    expect(toText).toBeInTheDocument();
    expect(messageText).toBeInTheDocument();
    expect(deleteButton).toBeInTheDocument();
    expect(markReadButton).toBeInTheDocument();
  });
});
