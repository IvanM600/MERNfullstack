import React, {useContext, useEffect, useState, useCallback} from "react"
import {useHttp} from "../hooks/http.hooks"
import {AuthContext} from "../context/AuthContext"
import {LinksList} from "../components/LinksList"
import {Loader} from "../components/Loader"

export const LinksPage = () => {
    const [links, setLinks] = useState([])
    const {loading, request} = useHttp()
    const {token} = useContext(AuthContext)

    const fetchLinks = useCallback( async () => {
        try {
          const fetched = await request ("/api/links", "GET", null, {
              Authorization: `Bearer ${token}`
          })
          setLinks(fetched)
        } catch(e) {

        }
    }, [token, request])

    useEffect(() => {
       fetchLinks()
    }, [fetchLinks])

    if (loading) {
        return <Loader />
    }
    return (
        <>
          {!loading && <LinksList links={links}/>}
        </>
    )
}