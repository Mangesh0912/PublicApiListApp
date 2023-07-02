import React, { useState, useEffect, useRef } from "react";
import PublicApiList from "./PublicApiList";
import LoadMask from "./common/LoadMask";
import ErrorComponent from "./common/ErrorComponent";

const PublicApiComponent = () => {
  const fetchedDataRef = useRef([]);
  const [loadedData, setLoadedData] = useState([]);
  const pageSize = 50;
  const [isLoading, setIsLoading] = useState(false);
  const pageStart = useRef(0);
  const pageEnd = useRef(50);
  const container = useRef();
  const [errorMsg, setErrorMsg] = useState();
  const [count, setCount] = useState();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const response = await fetch("https://api.publicapis.org/entries");
      const newData = await response.json();
      const { count, entries } = newData;
      setCount(count);
      if (entries) {
        const slicedData = entries?.slice(pageStart.current, pageEnd.current);
        fetchedDataRef.current = entries;
        setLoadedData(slicedData);
      }
    } catch (err) {
      setErrorMsg(err);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchSubSetOfData = () => {
    setIsLoading(true);
    pageStart.current = pageStart.current + pageSize;
    pageEnd.current = pageEnd.current + pageSize;
    const slicedData = fetchedDataRef.current.slice(
      pageStart.current,
      pageEnd.current
    );
    setLoadedData((prevLoadedData) => {
      return [...prevLoadedData, ...slicedData];
    });
    setIsLoading(false);
  };

  const handleScroll = (event) => {
    const elem = container.current;
    if (elem.getBoundingClientRect().bottom <= window.innerHeight) {
      fetchSubSetOfData();
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [loadedData]);

  return (
    <div ref={container}>
      {isLoading && <LoadMask />}
      {errorMsg && <ErrorComponent error={errorMsg} />}
      <h3>Api Records Count - {count} </h3>
      {loadedData && loadedData.length > 0 && (
        <PublicApiList loadedDataList={loadedData} />
      )}
    </div>
  );
};

export default PublicApiComponent;
