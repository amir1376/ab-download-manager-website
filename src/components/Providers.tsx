import React, {PropsWithChildren} from "react";
import {TranslationWrapper} from "~/i18n/TranslationContext.tsx";
import "~/i18n"
import {ThemeProvider} from "~/abstraction/theme/useTheme.tsx";
import {WithPageInfoHost} from "~/components/PageInfo.tsx";
export function Providers(
    {children}: PropsWithChildren
) {
    return <ThemeProvider>
        <TranslationWrapper>
            <WithPageInfoHost>
                {children}
            </WithPageInfoHost>
        </TranslationWrapper>
    </ThemeProvider>
}