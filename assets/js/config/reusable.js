import React from "react";
import ReactPaginate from "react-paginate";
import { Doughnut } from "react-chartjs-2";
import Fade from "react-bootstrap/Fade";
import ClampLines from "react-clamp-lines";
import Image from "react-bootstrap/Image";

export const MyPagination = (props) => {
    return (
        <div className="pagination-wrap">
            <ReactPaginate
                previousLabel={'previous'}
                nextLabel={'next'}
                breakLabel={'...'}
                pageCount={props.pageCount}
                marginPagesDisplayed={2}
                pageRangeDisplayed={5}
                onPageChange={props.handlePageClick}
                subContainerClassName={'pages pagination'}
                breakClassName={'page-item'}
                breakLinkClassName={'page-link'}
                containerClassName={'pagination justify-content-center'}
                pageClassName={'page-item'}
                pageLinkClassName={'page-link'}
                previousClassName={'page-item'}
                previousLinkClassName={'page-link'}
                nextClassName={'page-item'}
                nextLinkClassName={'page-link'}
                activeClassName={'active'}
            />
        </div>
    )
}

export const MyDoughnut = (props) => {
    return (
        <Doughnut 
            data={props.data}
            width={props.width}
            height={props.height}
            options={{ 
                maintainAspectRatio: false, 
                title: {
                    display: true,
                    text: props.title,
                    fontSize: 18
                } 
            }}
        />
    )
}

export const MyNotification = (props) => {
    if (props.isShown) {
        return (
            <Fade in={props.isShown} onClick={() => window.location.replace(props.url)}>
                <div className="notification"> 
                    <Image src={"https://smartfamily.noit.eu/cr-logo.png"} width={35} height={30}/>
                    <p className="d-inline notification-title">{props.title}</p>
                    <ClampLines
                        id={"gr-descr"}
                        text={props.body}
                        lines={1}
                        ellipsis="..."
                        innerElement="p"
                        />
                </div>
            </Fade>
        )
    } else {
        return null;
    }
}