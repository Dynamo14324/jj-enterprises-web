"use client"

import * as React from "react"
import { Check, ChevronsUpDown } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { useCurrency, Currency } from "@/lib/currency-context"

export function CurrencySelector() {
    const [open, setOpen] = React.useState(false)
    const { currency, setCurrency, rates } = useCurrency()

    // Sort currencies so selected is top or alphabetical? 
    // Let's keep them in order of standard definition or precedence: INR, USD, AED
    const currencyOptions = React.useMemo(() => {
        return Object.values(rates).map((rate) => ({
            value: rate.code,
            label: `${rate.code} (${rate.symbol}) - ${rate.name}`
        }))
    }, [rates])

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="w-[100px] justify-between p-2 h-9 text-xs font-medium border-orange-200 hover:bg-orange-50 hover:text-orange-900 transition-colors"
                >
                    {currency} ({rates[currency].symbol})
                    <ChevronsUpDown className="ml-1 h-3 w-3 shrink-0 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0 shadow-xl border-orange-100">
                <Command>
                    <CommandInput placeholder="Search currency..." className="h-9 text-xs" />
                    <CommandList>
                        <CommandEmpty>No currency found.</CommandEmpty>
                        <CommandGroup heading="Select Currency">
                            {currencyOptions.map((c) => (
                                <CommandItem
                                    key={c.value}
                                    value={c.value}
                                    onSelect={(currentValue: string) => {
                                        // currentValue is lowercase from cmk usually, careful.
                                        // We map back to the real code
                                        const found = currencyOptions.find((opt: { value: string; label: string }) => opt.value.toLowerCase() === currentValue.toLowerCase())
                                        if (found) {
                                            setCurrency(found.value as Currency)
                                        }
                                        setOpen(false)
                                    }}
                                    className="text-xs cursor-pointer aria-selected:bg-orange-50 aria-selected:text-orange-900"
                                >
                                    <Check
                                        className={cn(
                                            "mr-2 h-3 w-3",
                                            currency === c.value ? "opacity-100" : "opacity-0"
                                        )}
                                    />
                                    {c.label}
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    )
}
