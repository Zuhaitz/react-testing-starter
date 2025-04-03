import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

import Providers from "../../src/providers";
import Label from "../../src/components/Label";
import * as languageHook from "../../src/hooks/useLanguage";

import { Language } from "../../src/providers/language/type";
import en from "../../src/providers/language/data/en.json";
import es from "../../src/providers/language/data/es.json";

type LabelsDictionary = { [key: string]: { [key: string]: string } };

describe("Label", () => {
  let currentLanguage: Language = "en";
  const labelsDictionary: LabelsDictionary = { en, es };

  const useLanguageSpy = vi.spyOn(languageHook, "default");
  useLanguageSpy.mockReturnValue({
    currentLanguage,
    changeLanguage: vi.fn(),
    getLabel: vi.fn((labelId) => {
      const label = labelsDictionary[currentLanguage][labelId];
      if (!label)
        throw new Error(
          `LabelID ${labelId} not found in ${currentLanguage}.json`
        );
      return label;
    }),
  });

  const wrapper = ({ children }: any) => (
    <MemoryRouter initialEntries={["/"]}>
      <Providers>{children}</Providers>
    </MemoryRouter>
  );

  it("should display text depending of label", () => {
    const labelId = "new_product";
    render(<Label labelId={labelId} />, { wrapper });

    screen.getByText(labelsDictionary[currentLanguage][labelId]);
  });

  it("should display text when language is changed", () => {
    currentLanguage = "es";
    const labelId = "welcome";
    render(<Label labelId={labelId} />, { wrapper });

    screen.getByText(labelsDictionary[currentLanguage][labelId]);
  });
});
