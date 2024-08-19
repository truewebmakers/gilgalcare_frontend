export const myListingColumns = [
  {
    title: "Image",
    dataIndex: "image",
    render: (text, record, data) => (
      <div className="listingtable-img">
        {" "}
        <Link to="/service-details">
          <img className="img-fluid avatar-img" src={text} alt="" />
        </Link>
      </div>
    ),
    sorter: (a, b) => {
      a.image.length - b.image.length;
    },
  },
  {
    title: "Details",
    dataIndex: "content",
    render: (text, record, data) => (
      <>
        <h6>
          <Link to="/service-details">{text}</Link>
        </h6>
        <div className="listingtable-rate">
          <Link to="#" className="cat-icon">
            <i className="fa-regular fa-circle-stop" /> Electronics
          </Link>{" "}
          <span className="discount-amt">$350000.00</span>
          <span className="fixed-amt">$40000</span>
        </div>
        <p>Mauris vestibulum lorem a condimentum vulputate.</p>
      </>
    ),
    sorter: (a, b) => {
      a.content.length - b.content.length;
    },
  },
  {
    title: "Status",
    dataIndex: "status",
    render: (text, record, data) => <span className={record.bg}>{text}</span>,
    sorter: (a, b) => {
      a.status.length - b.status.length;
    },
  },
  {
    title: "Views",
    dataIndex: "numbers",
    render: (text, record, data) => <span>{text}</span>,
    sorter: (a, b) => {
      a.numbers.length - b.numbers.length;
    },
  },
  {
    title: "Action",
    dataIndex: "class",
    render: (text, record, data) => (
      <div className={text}>
        <Link to="#" className="action-btn btn-view">
          <i className="feather-eye" />
        </Link>
        <Link to="#" className="action-btn btn-edit">
          <i className="feather-edit-3" />
        </Link>
        <Link to="#" className="action-btn btn-trash">
          <i className="feather-trash-2" />
        </Link>
      </div>
    ),
    sorter: (a, b) => {
      a.class.length - b.class.length;
    },
  },
];
