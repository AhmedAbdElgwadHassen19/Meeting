import { CalendarRange, Presentation, TimerIcon } from "lucide-react";

export const menu = [
    {
        id:1,
        name:"Meeting List",
        path:"/dashboard/meeting-list",
        icon: Presentation
    }, 
    {
        id:2,
        name:"Schedule Meeting",
        path:"/dashboard/schedule-meeting",
        icon: CalendarRange
    }, 
    {
        id:3,
        name:"Time and Data",
        path:"/dashboard/availability",
        icon: TimerIcon
    }, 
] 