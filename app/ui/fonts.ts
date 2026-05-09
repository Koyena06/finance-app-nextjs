//this file contains fonts that will be used throughout the application
import {Inter,Lusitana} from 'next/font/google';
export const inter=Inter({subsets:['latin']});//variable font
export const lusitana=Lusitana({
    weight:['400','700'],
    subsets:['latin'],//only include latin and english 
});