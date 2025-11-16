import { ThemeProvider as NextThemeProvider } from "next-themes";
import type { ComponentProps, PropsWithChildren } from "react";

type ProviderProps = PropsWithChildren<
  Omit<ComponentProps<typeof NextThemeProvider>, "attribute" | "defaultTheme">
>;

export function ThemeProvider({ children, ...props }: ProviderProps) {
  return (
    <NextThemeProvider attribute="class" enableSystem defaultTheme="dark" {...props}>
      {children}
    </NextThemeProvider>
  );
}
