import React from "react"
import {render, screen, fireEvent} from "@testing-library/react"

import Alert from "./Alert"

describe("<Alert />", () => {
   

    test("render component", () => {
        render(<Alert message="Esta es una alerta que desaparece a los pocos segundos" severity="success"/>)

        const element = screen.getByText(/alerta que desaparece/i)

        expect(element).toBeInTheDocument();
    })

    test("render success color", () => {
        render(<Alert message="Esta es una alerta que desaparece a los pocos segundos" severity="success"/>)

        const dialog = screen.getByRole("alert")

        expect(dialog).toHaveClass("MuiAlert-colorSucces")
    })
})