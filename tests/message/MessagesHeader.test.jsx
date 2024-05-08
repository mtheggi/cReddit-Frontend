import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import MessagesHeader from "@/Components/messages/MessagesHeader";

describe("MessagesHeader Component", () => {
  it("displays header links correctly", () => {
    const mockPathname = "/message/inbox";
    Object.defineProperty(window, "location", {
      value: { pathname: mockPathname },
      writable: true,
    });

    const { getByText } = render(<MessagesHeader />);

    const composeLink = getByText("Compose");
    const inboxLink = getByText("Inbox");
    const sentLink = getByText("Sent");
    const allLink = getByText("all");
    const unreadLink = getByText("unread");
    const messagesLink = getByText("messages");
    const postRepliesLink = getByText("post replies");
    const usernameMentionsLink = getByText("username mentions");

    expect(composeLink).toBeInTheDocument();
    expect(inboxLink).toBeInTheDocument();
    expect(sentLink).toBeInTheDocument();
    expect(allLink).toBeInTheDocument();
    expect(unreadLink).toBeInTheDocument();
    expect(messagesLink).toBeInTheDocument();
    expect(postRepliesLink).toBeInTheDocument();
    expect(usernameMentionsLink).toBeInTheDocument();
  });
});
