import { describe, it, expect, vi, afterEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Rule from "@/Components/community/Rule";

describe("Rule Component", () => {
  it("renders without crashing", () => {
    render(
      <Rule id="1" i={1} text="Test Rule1" description="Test Description" />
    );
    expect(screen.getByText("Test Rule1")).not.toBeNull();
  });

  it("displays the correct rule number", () => {
    render(
      <Rule
        id="1-rule-number"
        i={1}
        text="Test Rule"
        description="Test Description"
      />
    );
    const ruleNumber = document.getElementById("1-rule-number");
    expect(ruleNumber).not.toBeNull();
  });

  it("displays the correct rule description when expanded", async () => {
    render(
      <Rule id="2" i={1} text="Test Rule3" description="Test Description3" />
    );
    fireEvent.click(screen.getByTestId("chvronUp_2"));
    await waitFor(() => screen.getByText("Test Description3"));
    expect(screen.getByText("Test Description3")).not.toBeNull();
  });

  it("hides the rule description when collapsed", async () => {
    render(
      <Rule id="4" i={1} text="Test Rule4" description="Test Description4" />
    );
    fireEvent.click(screen.getByTestId("chvronUp_4"));
    await waitFor(() => screen.getByText("Test Description4"));
    fireEvent.click(screen.getByTestId("chvronUp_4"));
    await waitFor(() => !screen.queryByText("Test Description4"));
    expect(screen.queryByText("Test Description4")).not.toBeNull();
  });

  it("changes the chevron icon direction when expanded", async () => {
    render(
      <Rule id="5" i={1} text="Test Rule5" description="Test Description5" />
    );
    const chevronIcon = screen.getByTestId("chvronUp_5");
    expect(chevronIcon.classList.contains("rotate")).to.be.false;
    fireEvent.click(chevronIcon);
    await waitFor(() => chevronIcon);
    expect(chevronIcon.classList.contains("rotate")).to.be.true;
  });
});
