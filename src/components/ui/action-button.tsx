import * as React from "react"
import { Button } from "./button"

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    text: string
}

const ActionButton = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ onClick, text }) => {
        return (
            <Button className="mr-2 hover:bg-gray-100" size="sm" variant="outline" onClick={onClick}>
                {text}
            </Button>
        )
    }
)

ActionButton.displayName = "Action Button"

export { ActionButton }
