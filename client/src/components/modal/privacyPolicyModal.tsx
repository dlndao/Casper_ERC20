import React, { useEffect } from "react";
import Modal from "react-modal";

Modal.setAppElement("#root");

const PrivacyPolicyModal = ({ display, changeState }: any) => {
  return (
    <Modal
      isOpen={display}
      onRequestClose={() => changeState()}
      style={{
        overlay: {
          backgroundColor: "rgba(255, 255, 255, 0.75)",
        },
        content: {
          position: "absolute",
          left: "20%",
          right: "20%",
          border: "2px solid #71B670",
          background: "#fff",
          overflow: "auto",
          WebkitOverflowScrolling: "touch",
          borderRadius: "4px",
          outline: "none",
          padding: "20px",
        },
      }}
    >
     <div className='dln-privacy'>
      <h2 className="mb-4">Privacy Policy</h2>
   
      <h5 className='dln-privacy-date'>Last Updated: 3 May 2021</h5>
      <p>
        This Privacy Policy provides our privacy policy regarding the nature,
        purpose, use, and sharing of personal data or other information
        collected from the users of the website DLN.org and other websites which
        use subdomains of DLN.org (“the Site”). We are committed to protecting
        and respecting your privacy. Please read this carefully as this Privacy
        Policy is legally binding when you use the Site.
      </p>
      <p>
        As used in this Privacy Policy, &quot;we&quot;, &quot;us&quot; or
        &quot;our&quot; refers to the Decentralized Lending Network, a
        Decentralized Autonomous Organization. You can reach us with any request
        relating to this Privacy Policy via contact details provided below.
      </p>
      <h4>Data Processing in Connection with the Site </h4>
      <h4>Use of Cookies and Similar Technologies</h4>
      <p>
        The Site is using cookies. Cookies are small text files that are placed
        on your computer by websites that you visit. They are widely used in
        order to make websites work, or work more efficiently, as well as to
        provide information to the owners of the site. Cookies are typically
        stored on your computer&#39;s hard drive. Information collected from
        cookies is used by us to evaluate the effectiveness of our Site and
        analyze trends. The information collected from cookies allows us to
        determine such things as which parts of the Site are most visited and
        difficulties our visitors may experience in accessing the Site. With
        this knowledge, we can improve the quality of your experience on the
        Site by recognizing and delivering more of the most desired features and
        information, as well as by resolving access difficulties.
      </p>
      <p>
        We use third party service providers, to assist us in better
        understanding the use of our Site. Our service providers will place
        cookies on the hard drive of your computer (or use similar technologies)
        and will receive information that we select that will educate us on such
        things as how visitors navigate around our Site. This information is
        aggregated to provide statistical data about our users&#39; browsing
        actions and patterns, and does not personally identify individuals. This
        information may include:
      </p>
      <p>
        Computer or mobile device information, Website usage information, such
        as: Page views, Button clicks, Input form changes (without the values
        being entered), Errors.
      </p>
      <p>
        Our service providers analyze this information and provides us with
        aggregate reports. The information and analysis provided by our service
        providers will be used to assist us in better understanding our
        visitors&#39; interests in our Site and how to better serve those
        interests. If you want to avoid using cookies altogether, you can
        disable cookies in your browser. However, disabling cookies might make
        it impossible for you to use certain features of the Site. Your use of
        the Site with a browser that is configure to accept cookies constitutes
        an acceptance of our and third-party cookies.
      </p>
      <h4> Email Marketing</h4>
      <p>
        If you subscribe to our newsletter we may occasionally communicate
        project news, updates, promotions and related information relating to
        DLN. We shall only do this where you have given us your consent. If you
        want to opt out of receiving promotional and marketing emails in
        relation to which you might receive in accordance with this section, you
        can best opt out by clicking &quot;unsubscribe&quot; at the bottom of an
        email we sent you.
      </p>
      <h4>Your Inquiries</h4>
      <p>
        You may contact us by e-mail to the following e-mail
        address: info@DLN.org. We use the data that you provide in an email to
        us, which you may give voluntarily, only in order to answer your contact
        question or to reply to your email in the best possible manner.
      </p>
      <h4>Social media</h4>
      <p>
        We may use plugins from social networks such as GitHub, YouTube, Reddit,
        Twitter, Telegram, Medium on the Site. When you activate them (by
        clicking on them), the operators of the respective social networks may
        record that you are on the Site and may use this information. This
        processing of your personal data lays in the responsibility of these
        individual social media platforms and occurs according to their privacy
        policies. Please check with these individual social media platforms
        regarding their privacy policies. We are not responsible for data
        collected by these individual social media platforms.
      </p>
      <h4>Your Rights</h4>
      <h5>Right to access</h5>
      <p>
        As a data subject you have the right to obtain from us free information
        about your personal data processed at any time and a copy of this
        information. Furthermore, you will have access to the following
        information: the purposes of the processing; the categories of personal
        data concerned; where possible, the envisaged period for which the
        personal data will be processed, or, if not possible, the criteria used
        to determine that period; the existence of the right to request from us
        rectification or erasure of personal data, or restriction of processing
        of personal data concerning you, or to object to such processing; the
        existence of the right to lodge a complaint with a supervisory
        authority; where the personal data are not collected directly from you,
        any available information as to their source; and the existence of
        automated decision-making, including profiling, and, at least in those
        cases, meaningful information about the logic involved, as well as the
        significance and envisaged consequences of such processing for you.
      </p>
      <h5>Right to Rectification </h5>
      <p>
        You have the right to obtain from us, without undue delay, the
        rectification of inaccurate personal data concerning you. Taking into
        account the purposes of the processing, you shall have the right to have
        incomplete personal data completed, including by means of providing a
        supplementary statement.
      </p>
      <h5> Right to be Forgotten</h5>
      <p>
        You have the right to obtain from us the erasure of personal data
        concerning you as soon as possible, and we shall have the obligation to
        erase personal data without undue delay where required by the law,
        including when:
      </p>
      <ul>
        <li>
          the personal data is no longer necessary in relation to the purposes
          for which they were collected or otherwise processed;
        </li>
        <li>there is no longer a legal ground for the processing;</li>
        <li>
          you object to the processing and there are no overriding legitimate
          grounds for the processing;
        </li>
    
      <li>the personal data has been unlawfully processed;</li>
      <li>
        the personal data must be erased for compliance with a legal obligation
        in accordance with the applicable law to which we are subject.
      </li> 
       </ul>
      <h5>Right to Restriction of Processing</h5>
      <p>
        You have the right to obtain from the Foundation restriction of
        processing where one of the following applies:
      </p>
      <ul>
        <li>
          the accuracy of the personal data is contested by you, for a period
          enabling us to verify the accuracy of the personal data;
        </li>
        <li>
          the processing is unlawful and you oppose the erasure of the personal
          data and requests instead the restriction of their use instead;
        </li>
        <li>
          we no longer needs the personal data for the purposes of the
          processing, but they are required by you for the establishment,
          exercise or defense of legal claims; and/or
        </li>
        <li>you have objected to processing pursuant to applicable laws.</li>
      </ul>
      <h5> Right to Object</h5>
      <p>
        You have the right to object, on grounds relating to your particular
        situation, at any time, to the processing of personal data concerning
        you. We shall no longer process the personal data in the event of the
        objection, unless we can demonstrate reasonable grounds for the
        processing, which override the interests, rights and freedoms of you, or
        for the establishment, exercise or defense of legal claims.
      </p>
      <h5>Right to withdraw data protection consent</h5>
      <p>
        You have the right to withdraw your consent to processing of your
        personal data at any time.
      </p>
      <h4>International Transfers</h4>
      <p>
        We are entitled to transfer your personal data to third parties abroad
        for the purposes of the data processing. As personal data processors,
        they are obliged to protect data privacy to the same extent as we
        ourselves. We choose the processors carefully to ensure compliance with
        applicable laws.
      </p>
      <h4>Data Security</h4>
      <p>
        We use appropriate technical and organizational security measures to
        protect your personal data. Our security measures are continuously being
        improved in line with technical developments.
      </p>
      <p>
        Please note that any data transmission on the Internet (e.g.
        communication by e-mail) is generally not secure and we accept no
        liability for data transmitted to us via the Internet. Unfortunately,
        absolute protection is not technically possible. This information does
        not apply to the websites of third parties and the corresponding links
        given on the Site. We assume no responsibility and liability for these.
      </p>
      <h4>Duration of Data Processing</h4>
      <p>
        We will process your personal data only for the period necessary to
        achieve the purpose of the processing, or as required by applicable
        laws. After the period the personal data will be deleted.
      </p>
      <h4>Amendments to this Policy</h4>
      <p>
        We may amend this Privacy Policy at any time by posting the amended
        version on the Site including the effective date of the amended version.
        The current version of the Privacy Policy, as published on the Site, is
        applicable.
      </p>
      <h4> Contact</h4>
      <p>
        Please contact us with questions, comments, or concerns regarding our
        Privacy Policy as well as with any requests at info@dln.org.
      </p>
      <br></br>
      <div className="btn dln-dismiss-btn ">
        <button
          className="btn dln-dismiss-font-color"
          onClick={() => changeState()}
        >
          Dismiss
        </button>
      </div>
      </div>
    </Modal>
  );
};

export default PrivacyPolicyModal;
