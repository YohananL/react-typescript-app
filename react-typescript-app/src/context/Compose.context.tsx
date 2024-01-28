import React, { FC, ReactNode } from 'react';

interface IComposeContext {
    components?: FC<{ children?: ReactNode }>[];
    children?: ReactNode | undefined;
}

export default function ComposeContext(props: IComposeContext) {
    const { components = [], children } = props;

    // // TS2786: 'ComposeContext' cannot be used as a JSX component.
    // // Its return type 'ReactNode' is not a valid JSX element.
    // return components.reduceRight((accumulator, Component: any) => {
    //     return <Component>{accumulator}</Component>;
    // }, children);

    return (
        // Fragments (<>) to return ReactNode elements
        <>
            {components.reduceRight((accumulator, Component: any) => {
                return <Component>{accumulator}</Component>;
            }, children)}
        </>
    );
}
