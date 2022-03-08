import * as React from "react"
import {useFormik} from 'formik'

// styles
const pageStyles = {
  color: "#232129",
  padding: 96,
  fontFamily: "-apple-system, Roboto, sans-serif, serif",
}

const toBase64 = (file) => new Promise((resolve, reject) => {
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = () => resolve(reader.result);
  reader.onerror = error => reject(error);
});

// markup
const IndexPage = () => {
  const formik = useFormik({
    initialValues: {
      exampleFile: undefined
    },
    onSubmit: async ( values ) => {
      const base64File = await toBase64( values.exampleFile )

      const response = await fetch( '/api/test', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify( { base64File } ),
      } )

      const success = await response.json()
      console.log(success)
    }
  })

  const handleFileAttachment = e => {
    formik.setFieldValue( 'exampleFile', e.currentTarget.files?.[ 0 ] )
  }

  return (
    <main style={pageStyles}>
      <title>Home Page</title>
      Attach a file over 100KB and submit.
      <form onSubmit={ formik.handleSubmit }>
        <input
          type="file"
          name="exampleFile"
          id="exampleFile"
          onChange={ handleFileAttachment }
        />
        <button type="submit">Submit</button>
      </form>
    </main>
  )
}

export default IndexPage
