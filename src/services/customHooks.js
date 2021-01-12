import { useEffect, useState } from "react";
// var window = require("global/window")

export function useForm(initialState, cb = function () { }) {
    const [fields, setFields] = useState(initialState);

    useEffect(() => { cb(fields) }, [fields])

    return [
        fields,
        function (event) {
            
            const value = event.target.type === 'number' ? +event.target.value : event.target.value
            setFields({
                ...fields,
                [event.target.name]: value
            });
            // console.log('cb, ',cb)
            // if(cb) cb(value)
         
        },
        function () {
            setFields(initialState);
        },
        function (todoToEditValues) {
            setFields(todoToEditValues);
        }
    ];
}
export function useMediaQuery(query) {
    const [matches, setMatches] = useState(false);
  
    useEffect(() => {
      const media = window.matchMedia(query);
      if (media.matches !== matches) {
        setMatches(media.matches);
      }
      const listener = () => {
        setMatches(media.matches);
      };
      media.addListener(listener);
      return () => media.removeListener(listener);
    }, [matches, query]);
  
    return matches;
  }
