import { act, renderHook } from "@testing-library/react";

import { LanguageProvider } from "../../src/providers/language/LanguageProvider";
import useLanguage from "../../src/hooks/useLanguage";
import { Language } from "../../src/providers/language/type";

describe("useLanguage", () => {
  const defaultLang: Language = "en";
  const wrapper = ({ children }: any) => (
    <LanguageProvider language={defaultLang}>{children}</LanguageProvider>
  );

  it("should change language when to the one indicated", () => {
    const { result } = renderHook(() => useLanguage(), { wrapper });
    expect(result.current.currentLanguage).toBe(defaultLang);
    act(() => result.current.changeLanguage("es"));
    expect(result.current.currentLanguage).toBe("es");
  });

  it("should get label based on the current language", () => {
    const { result } = renderHook(() => useLanguage(), { wrapper });
    expect(result.current.getLabel("welcome")).toMatch(/welcome/i);

    act(() => result.current.changeLanguage("es"));
    expect(result.current.getLabel("welcome")).toMatch(/bienvenido/i);
  });
});
