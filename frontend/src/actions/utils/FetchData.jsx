const FetchData = async ({url, method="POST", body=null, token=""}, dispatch) => {

  const headers = token
  ? { "Content-Type": "application/json", authorization: `Bearer ${token}` }
  : { "Content-Type": "application/json" }; // If token is not provided, then don't send it in the headers

  body = body ? {body: JSON.stringify(body)} : {}; // If body is not provided, then don't send it in the request

  try {
    const response = await fetch(url, { method, headers, ...body });
    console.log("Response:", response);

    const data = await response.json();
    console.log("Data:", data);

    if (!data.success) {
      if (response.status === 401) {
        dispatch({ type: "UPDATE_USER", payload: null });
        throw new Error(data.message);
      }
    }
    return data.data;
  } catch (error) {
    dispatch({type: 'UPDATE_NOTIFICATIONS', payload: {open: true, severity: 'error', message: error.message}})
    console.log(error);
    return null;
  }
};

export default FetchData;