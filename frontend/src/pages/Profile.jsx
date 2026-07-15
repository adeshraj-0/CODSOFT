import {
  useEffect,
  useState,
} from "react";

import { Navigate } from "react-router-dom";

import {
  doc,
  getDoc,
  setDoc,
  serverTimestamp,
} from "firebase/firestore";

import { db } from "../firebase/firebase";

import "../styles/Profile.css";

const createEmptyAddress = (user) => ({
  id: "",
  label: "Home",
  name: user?.displayName || "",
  email: user?.email || "",
  phone: "",
  address: "",
  city: "",
  state: "",
  pincode: "",
  isDefault: false,
});

function Profile({ user }) {
  const [addresses, setAddresses] =
    useState([]);

  const [address, setAddress] = useState(
    createEmptyAddress(user)
  );

  const [profileLoading, setProfileLoading] =
    useState(true);

  const [isSaving, setIsSaving] =
    useState(false);

  const [showAddressForm, setShowAddressForm] =
    useState(false);

  const [editingAddressId, setEditingAddressId] =
    useState(null);

  const [message, setMessage] =
    useState("");

  const [messageType, setMessageType] =
    useState("");

  useEffect(() => {
    if (!user) {
      setProfileLoading(false);

      return;
    }

    const loadProfile = async () => {
      try {
        setProfileLoading(true);

        const userReference = doc(
          db,
          "users",
          user.uid
        );

        const userSnapshot = await getDoc(
          userReference
        );

        if (userSnapshot.exists()) {
          const userData =
            userSnapshot.data();

          if (
            Array.isArray(userData.addresses)
          ) {
            setAddresses(userData.addresses);
          } else if (userData.address) {
            const oldAddress =
              userData.address;

            const migratedAddress = {
              id: `address-${Date.now()}`,
              label: "Home",
              name:
                oldAddress.name ||
                user.displayName ||
                "",
              email:
                oldAddress.email ||
                user.email ||
                "",
              phone:
                oldAddress.phone || "",
              address:
                oldAddress.address || "",
              city:
                oldAddress.city || "",
              state:
                oldAddress.state || "",
              pincode:
                oldAddress.pincode || "",
              isDefault: true,
            };

            setAddresses([
              migratedAddress,
            ]);

            await setDoc(
              userReference,
              {
                addresses: [
                  migratedAddress,
                ],
                updatedAt:
                  serverTimestamp(),
              },
              {
                merge: true,
              }
            );
          }
        }
      } catch (error) {
        console.error(
          "Profile load error:",
          error
        );

        setMessageType("error");

        setMessage(
          "Unable to load your saved addresses."
        );
      } finally {
        setProfileLoading(false);
      }
    };

    loadProfile();
  }, [user]);

  if (!user) {
    return (
      <Navigate
        to="/login"
        replace
      />
    );
  }

  const saveAddressesToFirestore = async (
    updatedAddresses
  ) => {
    const userReference = doc(
      db,
      "users",
      user.uid
    );

    await setDoc(
      userReference,
      {
        uid: user.uid,
        email: user.email,
        displayName:
          user.displayName || "",
        addresses: updatedAddresses,
        updatedAt: serverTimestamp(),
      },
      {
        merge: true,
      }
    );
  };

  const handleChange = (event) => {
    const {
      name,
      value,
    } = event.target;

    setAddress(
      (previousAddress) => ({
        ...previousAddress,
        [name]: value,
      })
    );

    if (message) {
      setMessage("");
      setMessageType("");
    }
  };

  const validateAddress = () => {
    const requiredFields = [
      address.label,
      address.name,
      address.email,
      address.phone,
      address.address,
      address.city,
      address.state,
      address.pincode,
    ];

    if (
      requiredFields.some(
        (field) =>
          !String(field || "").trim()
      )
    ) {
      setMessageType("error");

      setMessage(
        "Please fill all address details."
      );

      return false;
    }

    const emailPattern =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (
      !emailPattern.test(
        address.email.trim()
      )
    ) {
      setMessageType("error");

      setMessage(
        "Please enter a valid email address."
      );

      return false;
    }

    const phonePattern =
      /^[6-9]\d{9}$/;

    if (
      !phonePattern.test(
        address.phone.trim()
      )
    ) {
      setMessageType("error");

      setMessage(
        "Please enter a valid 10-digit mobile number."
      );

      return false;
    }

    const pincodePattern =
      /^\d{6}$/;

    if (
      !pincodePattern.test(
        address.pincode.trim()
      )
    ) {
      setMessageType("error");

      setMessage(
        "Please enter a valid 6-digit PIN code."
      );

      return false;
    }

    return true;
  };

  const resetAddressForm = () => {
    setAddress(
      createEmptyAddress(user)
    );

    setEditingAddressId(null);

    setShowAddressForm(false);
  };

  const handleAddNewAddress = () => {
    setAddress(
      createEmptyAddress(user)
    );

    setEditingAddressId(null);

    setMessage("");
    setMessageType("");

    setShowAddressForm(true);
  };

  const handleEditAddress = (
    savedAddress
  ) => {
    setAddress({
      ...savedAddress,
    });

    setEditingAddressId(
      savedAddress.id
    );

    setMessage("");
    setMessageType("");

    setShowAddressForm(true);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleSaveAddress = async (
    event
  ) => {
    event.preventDefault();

    if (isSaving) {
      return;
    }

    if (!validateAddress()) {
      return;
    }

    try {
      setIsSaving(true);

      setMessage("");
      setMessageType("");

      const cleanAddress = {
        id:
          editingAddressId ||
          `address-${Date.now()}`,
        label: address.label.trim(),
        name: address.name.trim(),
        email: address.email.trim(),
        phone: address.phone.trim(),
        address:
          address.address.trim(),
        city: address.city.trim(),
        state: address.state.trim(),
        pincode:
          address.pincode.trim(),
        isDefault:
          editingAddressId
            ? Boolean(
                address.isDefault
              )
            : addresses.length === 0,
      };

      let updatedAddresses;

      if (editingAddressId) {
        updatedAddresses =
          addresses.map(
            (savedAddress) =>
              savedAddress.id ===
              editingAddressId
                ? cleanAddress
                : savedAddress
          );
      } else {
        updatedAddresses = [
          ...addresses,
          cleanAddress,
        ];
      }

      await saveAddressesToFirestore(
        updatedAddresses
      );

      setAddresses(
        updatedAddresses
      );

      resetAddressForm();

      setMessageType("success");

      setMessage(
        editingAddressId
          ? "Address updated successfully."
          : "New delivery address saved successfully."
      );
    } catch (error) {
      console.error(
        "Address save error:",
        error
      );

      setMessageType("error");

      setMessage(
        "Unable to save address. Please try again."
      );
    } finally {
      setIsSaving(false);
    }
  };

  const handleSetDefault = async (
    addressId
  ) => {
    try {
      const updatedAddresses =
        addresses.map(
          (savedAddress) => ({
            ...savedAddress,
            isDefault:
              savedAddress.id ===
              addressId,
          })
        );

      await saveAddressesToFirestore(
        updatedAddresses
      );

      setAddresses(
        updatedAddresses
      );

      setMessageType("success");

      setMessage(
        "Default delivery address updated."
      );
    } catch (error) {
      console.error(
        "Default address error:",
        error
      );

      setMessageType("error");

      setMessage(
        "Unable to update default address."
      );
    }
  };

  const handleDeleteAddress = async (
    addressId
  ) => {
    const addressToDelete =
      addresses.find(
        (savedAddress) =>
          savedAddress.id === addressId
      );

    const shouldDelete =
      window.confirm(
        "Are you sure you want to delete this address?"
      );

    if (!shouldDelete) {
      return;
    }

    try {
      let updatedAddresses =
        addresses.filter(
          (savedAddress) =>
            savedAddress.id !== addressId
        );

      if (
        addressToDelete?.isDefault &&
        updatedAddresses.length > 0
      ) {
        updatedAddresses =
          updatedAddresses.map(
            (
              savedAddress,
              index
            ) => ({
              ...savedAddress,
              isDefault: index === 0,
            })
          );
      }

      await saveAddressesToFirestore(
        updatedAddresses
      );

      setAddresses(
        updatedAddresses
      );

      if (
        editingAddressId === addressId
      ) {
        resetAddressForm();
      }

      setMessageType("success");

      setMessage(
        "Address deleted successfully."
      );
    } catch (error) {
      console.error(
        "Delete address error:",
        error
      );

      setMessageType("error");

      setMessage(
        "Unable to delete address."
      );
    }
  };

  if (profileLoading) {
    return (
      <section className="profile-page">
        <div className="profile-container">
          <div className="profile-state">
            <div className="profile-loader" />

            <h2>
              Loading your profile...
            </h2>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="profile-page">
      <div className="profile-container">
        <div className="profile-header">
          <h1>My Profile</h1>

          <p>
            Manage your account and saved
            delivery addresses.
          </p>
        </div>

        <div className="profile-layout">
          <aside className="profile-account-card">
            <div className="profile-avatar">
              {(
                user.displayName ||
                user.email ||
                "U"
              )
                .charAt(0)
                .toUpperCase()}
            </div>

            <h2>
              {user.displayName ||
                user.email?.split("@")[0] ||
                "Origin User"}
            </h2>

            <p>{user.email}</p>

            <div className="profile-auth-badge">
              Firebase Authenticated
            </div>
          </aside>

          <div className="profile-address-section">
            <div className="saved-address-header">
              <div>
                <h2>Saved Addresses</h2>

                <p>
                  Manage your delivery
                  addresses for faster
                  checkout.
                </p>
              </div>

              <button
                type="button"
                className="add-address-btn"
                onClick={
                  handleAddNewAddress
                }
              >
                + Add New Address
              </button>
            </div>

            {message && (
              <p
                className={`profile-message ${
                  messageType === "error"
                    ? "profile-message-error"
                    : "profile-message-success"
                }`}
              >
                {message}
              </p>
            )}

            {showAddressForm && (
              <form
                className="address-card"
                onSubmit={
                  handleSaveAddress
                }
              >
                <div className="address-card-header">
                  <div>
                    <h2>
                      {editingAddressId
                        ? "Edit Address"
                        : "Add New Address"}
                    </h2>

                    <p>
                      Enter your delivery
                      details below.
                    </p>
                  </div>

                  <button
                    type="button"
                    className="cancel-address-btn"
                    onClick={
                      resetAddressForm
                    }
                  >
                    Cancel
                  </button>
                </div>

                <div className="address-form-grid">
                  <div className="profile-field">
                    <label>
                      Address Label
                    </label>

                    <select
                      name="label"
                      value={address.label}
                      onChange={handleChange}
                    >
                      <option value="Home">
                        Home
                      </option>

                      <option value="Work">
                        Work
                      </option>

                      <option value="Other">
                        Other
                      </option>
                    </select>
                  </div>

                  <div className="profile-field">
                    <label>Full Name</label>

                    <input
                      type="text"
                      name="name"
                      value={address.name}
                      onChange={handleChange}
                      autoComplete="name"
                    />
                  </div>

                  <div className="profile-field">
                    <label>
                      Email Address
                    </label>

                    <input
                      type="email"
                      name="email"
                      value={address.email}
                      onChange={handleChange}
                      autoComplete="email"
                    />
                  </div>

                  <div className="profile-field">
                    <label>
                      Mobile Number
                    </label>

                    <input
                      type="tel"
                      name="phone"
                      value={address.phone}
                      onChange={handleChange}
                      maxLength="10"
                      inputMode="numeric"
                      autoComplete="tel"
                    />
                  </div>

                  <div className="profile-field profile-field-full">
                    <label>
                      Full Delivery Address
                    </label>

                    <textarea
                      name="address"
                      value={address.address}
                      onChange={handleChange}
                      autoComplete="street-address"
                    />
                  </div>

                  <div className="profile-field">
                    <label>City</label>

                    <input
                      type="text"
                      name="city"
                      value={address.city}
                      onChange={handleChange}
                      autoComplete="address-level2"
                    />
                  </div>

                  <div className="profile-field">
                    <label>State</label>

                    <input
                      type="text"
                      name="state"
                      value={address.state}
                      onChange={handleChange}
                      autoComplete="address-level1"
                    />
                  </div>

                  <div className="profile-field">
                    <label>PIN Code</label>

                    <input
                      type="text"
                      name="pincode"
                      value={address.pincode}
                      onChange={handleChange}
                      maxLength="6"
                      inputMode="numeric"
                      autoComplete="postal-code"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="save-address-btn"
                  disabled={isSaving}
                >
                  {isSaving
                    ? "Saving Address..."
                    : editingAddressId
                    ? "Update Address"
                    : "Save Address"}
                </button>
              </form>
            )}

            <div className="saved-address-grid">
              {addresses.length === 0 ? (
                <div className="no-address-card">
                  <div className="no-address-icon">
                    📍
                  </div>

                  <h3>
                    No saved addresses
                  </h3>

                  <p>
                    Add a delivery address to
                    make checkout faster.
                  </p>

                  <button
                    type="button"
                    onClick={
                      handleAddNewAddress
                    }
                  >
                    Add Your First Address
                  </button>
                </div>
              ) : (
                addresses.map(
                  (savedAddress) => (
                    <article
                      className={`saved-address-card ${
                        savedAddress.isDefault
                          ? "default-address-card"
                          : ""
                      }`}
                      key={savedAddress.id}
                    >
                      <div className="saved-address-top">
                        <div className="address-label">
                          <span>
                            {savedAddress.label ===
                            "Home"
                              ? "🏠"
                              : savedAddress.label ===
                                "Work"
                              ? "💼"
                              : "📍"}
                          </span>

                          <h3>
                            {
                              savedAddress.label
                            }
                          </h3>
                        </div>

                        {savedAddress.isDefault && (
                          <span className="default-address-badge">
                            Default
                          </span>
                        )}
                      </div>

                      <h4>
                        {savedAddress.name}
                      </h4>

                      <p>
                        {
                          savedAddress.phone
                        }
                      </p>

                      <p>
                        {
                          savedAddress.email
                        }
                      </p>

                      <p className="saved-address-text">
                        {
                          savedAddress.address
                        }
                        <br />

                        {savedAddress.city},{" "}
                        {savedAddress.state} -{" "}
                        {
                          savedAddress.pincode
                        }
                      </p>

                      <div className="saved-address-actions">
                        <button
                          type="button"
                          className="edit-address-btn"
                          onClick={() =>
                            handleEditAddress(
                              savedAddress
                            )
                          }
                        >
                          Edit
                        </button>

                        {!savedAddress.isDefault && (
                          <button
                            type="button"
                            className="default-address-btn"
                            onClick={() =>
                              handleSetDefault(
                                savedAddress.id
                              )
                            }
                          >
                            Set as Default
                          </button>
                        )}

                        <button
                          type="button"
                          className="delete-address-btn"
                          onClick={() =>
                            handleDeleteAddress(
                              savedAddress.id
                            )
                          }
                        >
                          Delete
                        </button>
                      </div>
                    </article>
                  )
                )
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Profile;