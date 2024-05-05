import { describe, it, vi, expect } from "vitest";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import Pagination from "@/Components/messages/Pagination";

describe("Pagination Component", () => {
  it("renders pagination correctly", () => {
    const { getByText } = render(
      <Pagination
        currentPage={1}
        hasMoreContent={true}
        onNextPage={vi.fn()}
        onPrevPage={vi.fn()}
      />
    );

    const prevButton = getByText("<");
    const nextButton = getByText(">");

    expect(prevButton).toBeInTheDocument();
    expect(nextButton).toBeInTheDocument();
  });
});
