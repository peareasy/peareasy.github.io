import { useState } from "react";

export default function Toggle() {
    const [enabled, setEnabled] = useState(false);

    return (
        <>
            <div className="relative inline-block w-10 mr-2 align-middle select-none">
                    <input type="checkbox" name="toggle" id="Green" className="checked:bg-green-500 outline-none focus:outline-none right-4 checked:right-0 duration-200 ease-in absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer"/>
                        <label  className="block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer">
                        </label>
                    </div>
                    <span className="text-gray-400 font-medium">
                        Green
                    </span>

        </>
    );
}