import React, { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import Spinner from "react-bootstrap/Spinner";
import Pagination from "react-bootstrap/Pagination";
import axios from "axios";

const Home = () => {
  const [data, setData] = useState();

  const [pageData, setPageData] = useState([]);
  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState(0);

  const getdata = async () => {
    const response = await axios.get("https://dummyjson.com/products");
    setData(response.data.products);
  };

  //   handle next

  const handleNext = () => {
    if (page === pageCount) {
      return page;
    }
    setPage(page + 1);
  };

  //   handle Previous

  const handlePrevious = () => {
    if (page === 1) {
      return page;
    }
    setPage(page - 1);
  };

  useEffect(() => {
    getdata();
  }, [page]);

  useEffect(() => {
    const pagedatacount = Math.ceil(data?.length / 5);
    setPageCount(pagedatacount);

    if (page) {
      const LIMIT = 5;
      const skip = LIMIT * page; // 5 *2 = 10
      const dataskip = data?.slice(page === 1 ? 0 : skip - LIMIT, skip); // slice give result in the form of slice(start, end-1)
      setPageData(dataskip);
    }
  }, [data]);

  return (
    <>
      <div className="container">
        <h2 className="text-center">User Data</h2>

        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Username</th>
            </tr>
          </thead>
          <tbody>
            {pageData?.length > 0 ? (
              pageData?.map((element, index) => {
                return (
                  <>
                    <tr key={index}>
                      <td>{element.id}</td>
                      <td>{element.price}</td>
                      <td>{element.title}</td>
                      <td>
                        <img
                          src={element.thumbnail}
                          style={{ width: 60, height: 60 }}
                          alt=""
                        />
                      </td>
                    </tr>
                  </>
                );
              })
            ) : (
              <div className="d-flex justify-content-center mt-4">
                <h4>Loading... </h4>
                <Spinner animation="border" variant="danger" />
              </div>
            )}
          </tbody>
        </Table>
      </div>

      <div className="d-flex justify-content-center">
        <Pagination>
          <Pagination.Prev onClick={handlePrevious} disabled={page === 1} />
          {Array(pageCount)
            .fill(null)
            .map((e, index) => {
              return (
                <>
                  <Pagination.Item
                    active={page === index + 1 ? true : false}
                    onClick={() => setPage(index + 1)}
                  >
                    {index + 1}
                  </Pagination.Item>
                </>
              );
            })}
          <Pagination.Next onClick={handleNext} disabled={page === pageCount} />
        </Pagination>
      </div>
    </>
  );
};

export default Home;
