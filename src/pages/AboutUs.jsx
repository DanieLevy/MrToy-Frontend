import { useEffect, useState } from "react"
import { utilService } from "../services/util.service"
import GoogleMapReact from "google-map-react"

const AnyReactComponent = ({ text, size }) => (
  <div style={{ fontSize: size }}>{text}</div>
)

const API_KEY = "AIzaSyCF6YSAF__0aiqIrTE2ZClywS74stbpWuE"


// const hSize = window.innerWidth < 768 ? "40vh" : "50vh"
// const wSize = window.innerWidth < 768 ? "100vw" : "50vw"

export function AboutUs() {
  const defaultProps = {
    center: {
      lat: 32.0853,
      lng: 34.7818,
    },
    zoom: 11,
  }

  const [mapCenter, setMapCenter] = useState(defaultProps.center)
  const [isMobile, setIsMobile] = useState(false || window.innerWidth < 768)

  useEffect(() => {
    const checkMobile = () => {
      window.innerWidth < 768 ? setIsMobile(true) : setIsMobile(false)
    }
    window.addEventListener("resize", checkMobile)
    return () => {
      window.removeEventListener("resize", checkMobile)
    }
  }, [])


  const storeMarkers = [
    {
      key: "tel-aviv",
      lat: 32.0853,
      lng: 34.7818,
      text: "📍",
      label: "Tel Aviv",
      address: "Even Gvirol St 71, Tel Aviv-Yafo",
    },
    {
      key: "jerusalem",
      lat: 31.7683,
      lng: 35.2137,
      text: "📍",
      label: "Jerusalem",
      address: "HaPalmach St 10, Jerusalem",
    },
    {
      key: "haifa",
      lat: 32.794,
      lng: 34.9896,
      text: "📍",
      label: "Haifa",
      address: "HaNassi Blvd 136, Haifa",
    },
    {
      key: "eilat",
      lat: 29.5581,
      lng: 34.9482,
      text: "📍",
      label: "Eilat",
      address: "Derech Ha'Arava St 8, Eilat",
    },
  ]

  // Handle popup window
  const [isOpen, setIsOpen] = useState(false)
  const [selectedStore, setSelectedStore] = useState(null)

  function handleMarkerClick(marker, markerKey) {
    setSelectedStore(markerKey)
    setIsOpen(true)
  }

  function handlePopupClose() {
    setIsOpen(false)
  }

  // Handle map location
  function handleLocationClick(lat, lng, marker, markerKey) {
    handleMarkerClick(markerKey, marker)
    setMapCenter({ lat, lng })
  }

  return (
    <div className="about-us flex">
        {/* About Us text */}
        <article className="about-us-text">
            <h3>Our Story</h3>
            <br/>
            <p>We are a small toy store located in the heart of Tel Aviv. We have been in the business for over 20 years and we are proud to say that we have the best toys in town. We have a wide variety of toys for all ages and we are always happy to help you find the perfect toy for your child.</p>
            <br/>
            <p>Our main store is open 7 days a week from 9:00 to 21:00. We are located in Even Gvirol St 71, Tel Aviv-Yafo.</p>
            <br/>
            <p>Our other stores are located in Jerusalem, Haifa and Eilat.</p>
            <br/>
            <p>For any questions, please contact us at: <a href="mailto:toys.coding.co.il">toys.coding.co.il</a></p>
        </article>


      {/* Map */}
      <article>
        <div style={{ 
            height: isMobile ? "40vh" : "50vh",
            width: isMobile ? "100vw" : "50vw",
        }}

            className="map-container">
          <GoogleMapReact
            onChildClick={handleMarkerClick}
            bootstrapURLKeys={{
              key: API_KEY,
            }}
            center={mapCenter} // Use mapCenter state as the center
            defaultZoom={defaultProps.zoom}
          >
            {/* Markers */}
            {storeMarkers.map((marker) => {
              return (
                <AnyReactComponent
                  onClick={() => handleMarkerClick(marker, marker.key)}
                  lat={marker.lat}
                  lng={marker.lng}
                  text={marker.text}
                  size={20}
                  key={marker.key}
                  label={marker.label}
                  address={marker.address}
                />
              )
            })}
          </GoogleMapReact>
        </div>

        {/* Buttons to change map location */}
        <div className="location-btns flex">
          <h3>Our Stores</h3>
          {storeMarkers.map((marker) => {
            return (
              <button
                className="location-btn"
                onClick={() =>
                  handleLocationClick(
                    marker.lat,
                    marker.lng,
                    marker,
                    marker.key
                  )
                }
                key={marker.key}
              >
                {marker.label}
              </button>
            )
          })}
        </div>
      </article>

      {/* Popup window */}
      {isOpen && (
        <div className="location-popup">
          <button className="close-btn" onClick={handlePopupClose}>
            X
          </button>
          <h3>{selectedStore.label}</h3>
          <p>Street Address: {selectedStore.address}</p>
        </div>
      )}
    </div>
  )
}
