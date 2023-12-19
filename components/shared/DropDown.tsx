"use client"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

import { ICategory } from "@/lib/mongoDB/database/models/category.module"
import { startTransition, useState } from "react"
import { Input } from "../ui/input"


type DropDown={
    value?:string
    onChangeHandler?:()=>void
}

const DropDown = ({value,onChangeHandler}:DropDown) => {
    const [categories, setCategories] = useState<ICategory[]>([])

    const [newCategory, setNewCategory] = useState('')

    const handleAddCategory = () => {}
    
  return (
    <div>
        <Select onValueChange = {onChangeHandler} defaultValue ={value}>
            <SelectTrigger className="select-field">
                <SelectValue placeholder="category" />
            </SelectTrigger>
            <SelectContent>
                {
                    categories.length > 0 && categories.map((category) =>(
                        <SelectItem key={category.id } value={category.id} className="elect-item p-regular-14">
                            {category.name}
                        </SelectItem>
                    )
                )}

                <AlertDialog>
                    <AlertDialogTrigger className="p-medium-14 flex w-full rounded-sm py3 pl-8 text-primary-500 hover:bg-primary-50 focus:text-primary-500">Open</AlertDialogTrigger>
                    <AlertDialogContent className="bg-white">
                        <AlertDialogHeader>
                        <AlertDialogTitle>New Category</AlertDialogTitle>
                        <AlertDialogDescription>
                            <Input type="text" placeholder="Category name" className="input-field mt-3" onChange={(e) =>setNewCategory(e.target.value)} />
                        </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={()=>startTransition(handleAddCategory)}>Add</AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>

            </SelectContent>
        </Select>

    </div>
  )
}

export default DropDown