import React, {PropsWithChildren} from "react";
import {TranslationWrapper} from "~/i18n/TranslationContext.tsx";
import "~/i18n"
import {ThemeProvider} from "~/abstraction/theme/useTheme.tsx";
export function Providers(
    {children}: PropsWithChildren
) {
    return <ThemeProvider>
        <TranslationWrapper>
            {children}
        </TranslationWrapper>
    </ThemeProvider>
}