import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'

export default function PlusIcon({ onClick }) {
    return (
        <FontAwesomeIcon
            className="text-success"
            size={"lg"}
            icon={faPlus}
            style={{ cursor: "pointer" }}
            {...{ onClick }}
        />
    )
}
