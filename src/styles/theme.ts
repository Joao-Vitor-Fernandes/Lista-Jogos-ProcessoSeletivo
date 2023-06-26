import { extendTheme } from "@chakra-ui/react";

export const theme = extendTheme({
    breakpoints: {
        sm: "30em",
        xs: "34em", // Novo tamanho entre base e sm
        md: "48em",
        lg: "62em",
        xl: "80em",
        "2xl": "96em",
    },
    styles: {
        global: {
            body: {
                // bg: "black",
                // bg: "linear-gradient(346deg, rgba(49,107,226,1) 15%, rgba(8,1,4,1) 60%)",
                bg: "linear-gradient(352deg, rgba(49,107,226,1) 8%, rgba(8,1,4,1) 55%)",
                color: "white",
            },
        },
    },
});