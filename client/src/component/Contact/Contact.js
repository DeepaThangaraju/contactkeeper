import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { contactList } from "../../action/contactAction";
import { Loading } from "../Loading";
import { Error } from "../error";
import ContactItem from "./contactItem";
import ContactForm from "./ContactForm";

export default function Contact({ history }) {
  const dispatch = useDispatch();

  const [searchInput, setSearchInput] = useState("");

  const [filteredResults, setFilteredResults] = useState([]);

  const getContact = useSelector((state) => state.contactList);
  const { loading, error, contacts } = getContact;

  const deleteContact = useSelector((state) => state.contactDelete);
  const { loading: deleteLoading, error: deleteErroe, success } = deleteContact;

  const user = useSelector((state) => state.userLoginReducer);
  const { userInfo } = user;
  console.log(contacts);

  const searchItems = (searchValue) => {
    setSearchInput(searchValue);
    if (searchInput !== "") {
      const filteredData = contacts.filter((item) => {
        return Object.values(item)
          .join("")
          .toLowerCase()
          .includes(searchInput.toLowerCase());
      });
      setFilteredResults(filteredData);
    } else {
      setFilteredResults(contacts);
    }
  };

  useEffect(() => {
    if (userInfo) {
      dispatch(contactList());
    } else {
      history.push("/login");
    }
  }, [dispatch, history, userInfo, success]);

  return (
    <>
      <div className="grid-2">
        <div>
          <ContactForm />
        </div>
        <div>
          <input
            type="text"
            icon="search"
            placeholder="Search..."
            onChange={(e) => searchItems(e.target.value)}
          />
          {loading ? (
            <Loading />
          ) : error ? (
            <Error error={error} />
          ) : (
            <>
              
                {searchInput.length > 1 ? (
                  filteredResults.map((item) => {
                    return <>{<ContactItem contact={item} />}</>;
                  })
                ) : (
                  <>
                    {contacts.map((contact) => (
                      <ContactItem contact={contact} />
                    ))}
                  </>
                )}
            </>
          )}
        </div>
      </div>
    </>
  );
}
