import "react"

declare module "react" {
    export interface HTMLAttributes {
        dataCy?: string
    }
}