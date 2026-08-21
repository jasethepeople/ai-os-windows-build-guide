import { describe, expect, it } from "vitest";
import { bugReportInput } from "./routers";

const validReport = {
  category: "build" as const,
  severity: "normal" as const,
  title: "PyInstaller cannot find the application module",
  description: "The build stops during analysis after the package is extracted and the documented command is executed.",
  reproductionSteps: "Open Command Prompt in the project directory and run pyinstaller ai_os.spec.",
  environmentDetails: "Windows 11, Python 3.11",
  commandUsed: "pyinstaller ai_os.spec",
  contactEmail: "reporter@example.com",
  consent: true as const,
};

describe("bugReportInput", () => {
  it("accepts a complete public bug report", () => {
    expect(bugReportInput.safeParse(validReport).success).toBe(true);
  });

  it("rejects reports without enough diagnostic detail", () => {
    expect(bugReportInput.safeParse({ ...validReport, description: "Too short" }).success).toBe(false);
  });

  it("requires the sensitive-information acknowledgement", () => {
    expect(bugReportInput.safeParse({ ...validReport, consent: false }).success).toBe(false);
  });
});

