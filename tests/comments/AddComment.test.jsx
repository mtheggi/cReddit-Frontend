import { describe, it, expect, vi, afterEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import AddComment from "@/Components/mainfeed/comment/AddComment";

describe("AddComment Component", () => {
  it("renders AddComment component without crashing", () => {
    const setIsCommenting = vi.fn();
    render(
      <AddComment
        postId="1"
        isCommenting={false}
        setIsCommenting={setIsCommenting}
        onAddComment={vi.fn()}
        setPostComments={vi.fn()}
        selectedSort="New"
      />
    );
  });

  it('renders "Add Comment" button when isCommenting is false', () => {
    const setIsCommenting = vi.fn();
    render(
      <AddComment
        postId="1"
        isCommenting={false}
        setIsCommenting={setIsCommenting}
        onAddComment={vi.fn()}
        setPostComments={vi.fn()}
        selectedSort="New"
      />
    );
    const buttonElement = document.getElementById("1-add-comment-button");
    expect(buttonElement).not.toBeNull();
  });

  it('calls setIsCommenting when "Add Comment" button is clicked', async () => {
    const setIsCommenting = vi.fn();
    render(
      <AddComment
        postId="1"
        isCommenting={false}
        setIsCommenting={setIsCommenting}
        onAddComment={vi.fn()}
        setPostComments={vi.fn()}
        selectedSort="New"
      />
    );
    const buttonElement = document.getElementById("1-add-comment-button");
    fireEvent.click(buttonElement);
    waitFor(() => {
      expect(setIsCommenting).toHaveBeenCalledTimes(1);
    });
  });
});
