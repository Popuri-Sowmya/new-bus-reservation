import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

export function Help() {
  const [formOpen, setFormOpen] = useState(true);

  const toggleForm = () => {
    setFormOpen(!formOpen);
  };

  return (
    <div className="container">
      <h1 className="text-center">FAQs</h1>
        <div className="accordion w-100" id="basicAccordion">
          {/* FAQ items */}
          <div className="accordion-item">
            <h2 className="accordion-header" id="headingOne">
              <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                data-bs-target="#collapseOne" aria-expanded="false" aria-controls="collapseOne">
                What is FastX Assured?
              </button>
            </h2>
            <div id="collapseOne" className="accordion-collapse collapse" aria-labelledby="headingOne" data-bs-parent="#basicAccordion">
              <div className="accordion-body">
                FastX Assured is a service provided by FastX that guarantees certain benefits such as refunds and compensation for various situations related to bus travel.
              </div>
            </div>
          </div>
          <div className="accordion-item">
            <h2 className="accordion-header" id="headingTwo">
              <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                Where do I opt for FastX Assured?
              </button>
            </h2>
            <div id="collapseTwo" className="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#basicAccordion">
              <div className="accordion-body">
                You can opt for FastX Assured during the booking process on the FastX platform. It is usually presented as an add-on service during checkout.
              </div>
            </div>
          </div>
          <div className="accordion-item">
            <h2 className="accordion-header" id="headingThree">
              <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                How do I claim my refund for the bus delay?
              </button>
            </h2>
            <div id="collapseThree" className="accordion-collapse collapse" aria-labelledby="headingThree" data-bs-parent="#basicAccordion">
              <div className="accordion-body">
                To claim a refund for a bus delay, you need to contact FastX customer support with your booking details and provide information about the delay. FastX will then process your refund accordingly.
              </div>
            </div>
          </div>

          <div className="accordion-item">
            <h2 className="accordion-header" id="headingFour">
              <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                data-bs-target="#collapseFour" aria-expanded="false" aria-controls="collapseFour">
                What is FastX&apos;s policy on luggage?
              </button>
            </h2>
            <div id="collapseFour" className="accordion-collapse collapse" aria-labelledby="headingFour" data-bs-parent="#basicAccordion">
              <div className="accordion-body">
                FastX allows passengers to bring a certain amount of luggage depending on the ticket type. Please refer to the FastX website or contact customer support for specific details regarding luggage policy.
              </div>
            </div>
          </div>

          <div className="accordion-item">
            <h2 className="accordion-header" id="headingFive">
              <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                data-bs-target="#collapseFive" aria-expanded="false" aria-controls="collapseFive">
                Can I change my travel date after booking?
              </button>
            </h2>
            <div id="collapseFive" className="accordion-collapse collapse" aria-labelledby="headingFive" data-bs-parent="#basicAccordion">
              <div className="accordion-body">
                Yes, you can usually change your travel date after booking, but it depends on the fare type and availability. Contact FastX customer support or visit the website for assistance with changing your travel date.
              </div>
            </div>
          </div>

          <div className="accordion-item">
            <h2 className="accordion-header" id="headingSix">
              <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                data-bs-target="#collapseSix" aria-expanded="false" aria-controls="collapseSix">
                What should I do if I miss my bus?
              </button>
            </h2>
            <div id="collapseSix" className="accordion-collapse collapse" aria-labelledby="headingSix" data-bs-parent="#basicAccordion">
              <div className="accordion-body">
                If you miss your bus, contact FastX customer support immediately for assistance. They may be able to help you with alternative travel arrangements or provide information on refund options.
              </div>
            </div>
          </div>

          <div className="accordion-item">
            <h2 className="accordion-header" id="headingSeven">
              <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                data-bs-target="#collapseSeven" aria-expanded="false" aria-controls="collapseSeven">
                How can I track my bus?
              </button>
            </h2>
            <div id="collapseSeven" className="accordion-collapse collapse" aria-labelledby="headingSeven" data-bs-parent="#basicAccordion">
              <div className="accordion-body">
                FastX provides a bus tracking feature on its website or mobile app. You can enter your booking details to track the current location and estimated arrival time of your bus.
              </div>
            </div>
          </div>
        </div>
      <div className="mt-5">
        <h2>FastX Support Contact:</h2>
        <p>Phone: +1-800-789-999</p>
        <p>Email: support@fastx.com</p>
      </div>
     
    </div>
  );
}
