import { FunctionComponent } from 'react';

interface inputQueryProps {
    title: string,
    updateFunc: Function,
    value: string,
    size?: string
}

const InputQuery: FunctionComponent<inputQueryProps> = ({ title, updateFunc, value, size }: inputQueryProps) => {

    return (
        <>
            <div className="m-1">
                <h1 className="uppercase text-white m-1">{title}</h1>
                <input type="text" placeholder="Type here" className={`input input-bordered w-full max-w-xs ${"input" + size}`} value={value} onChange={(e) => updateFunc(e.target.value)} />
            </div>

        </>
    );
};

export default InputQuery;