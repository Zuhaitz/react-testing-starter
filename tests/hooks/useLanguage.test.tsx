import { act, renderHook } from "@testing-library/react";

import { LanguageProvider } from "../../src/providers/language/LanguageProvider";
import useLanguage from "../../src/hooks/useLanguage";
import { Language } from "../../src/providers/language/type";

describe("useLanguage", () => {
  const defaultLang: Language = "en";
  const wrapper = ({ children }: any) => (
    <LanguageProvider language={defaultLang}>{children}</LanguageProvider>
  );

  it("should", () => {
    const { result } = renderHook(() => useLanguage(), { wrapper });
    expect(result.current.currentLanguage).toBe(defaultLang);
    act(() => result.current.changeLanguage("es"));
    expect(result.current.currentLanguage).toBe("es");
  });
});
