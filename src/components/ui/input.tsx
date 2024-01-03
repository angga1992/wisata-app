import * as React from "react"

import { cn } from "@/lib/utils"
import { Upload } from 'lucide-react';

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
          type={type}
          className={cn(
            "flex h-10 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-slate-500 transition duration-300 ease-in-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-800 dark:bg-slate-950 dark:ring-offset-slate-950 dark:placeholder:text-slate-400 dark:focus-visible:ring-slate-300",
            className
          )}
          ref={ref}
          {...props}
        />
    )
  }
)
Input.displayName = "Input"


const InputPrefix = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, children, ...props }, ref) => {
    return (
      <div className="relative">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <span className="text-slate-500 sm:text-sm">
              { children }
            </span>
        </div>
        <input
          type={type}
          className={cn(
            "flex h-10 pl-10 w-full rounded-md border border-slate-200 bg-white py-2 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-slate-500 transition duration-300 ease-in-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-800 dark:bg-slate-950 dark:ring-offset-slate-950 dark:placeholder:text-slate-400 dark:focus-visible:ring-slate-300",
            className
          )}
          ref={ref}
          {...props}
        />
      </div>
      
    )
  }
)
InputPrefix.displayName = "InputPrefix"

const InputSuffix = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, children, ...props }, ref) => {
    return (
      <div className="relative">
        <div className="absolute inset-y-0 right-0 flex items-center pr-3">
          <span className="text-slate-500 sm:text-sm">
            {children}
          </span>
        </div>
        <input
          type={type}
          className={`
            flex h-10 pl-2 w-full rounded-md border border-slate-200 bg-white py-2 text-sm
            file:border-0 file:bg-transparent file:text-sm file:font-medium
            placeholder:text-slate-500 transition duration-300 ease-in-out
            focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary
            disabled:cursor-not-allowed disabled:opacity-50
            dark:border-slate-800 dark:bg-slate-950 dark:ring-offset-slate-950
            dark:placeholder:text-slate-400 dark:focus-visible:ring-slate-300
            ${type !== 'file' ? 'truncate pr-12' : ''}
            ${className}`}
          ref={ref}
          {...props}
        />
      </div>
    );
  }
);

InputSuffix.displayName = "InputSuffix"

const InputFile = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <div className="flex items-center justify-center w-full">
        <label className={cn("flex flex-col items-center justify-center w-full h-32 border-2 border-[#48A43F] border-dashed rounded-lg cursor-pointer bg-[#DAEDD9] dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600", className)}>
            <div className="flex items-center justify-center">
              <div className="place-content-center w-14">
                <div><Upload size={36} className="text-primary" /></div>
              </div>
              <div className="item-center shrink w-full">
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  <span className="font-bold text-lg text-primary">Telusuri File</span>
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-500">
                  Maksimal 5 MB dalam format file .pdf, .docx, atau .xls.
                </p>
              </div>
            </div>
            <input id="dropzone-file" type="file" className="hidden" ref={ref} {...props} />
        </label>
    </div> 
    )
  }
)
InputFile.displayName = "InputFile"

export { Input, InputPrefix, InputFile, InputSuffix }
