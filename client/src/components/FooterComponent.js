import React from 'react'
import { baseUrl } from '../shared/baseURL'

function FooterComponent() {
  return (
    <div>
      {/* <!-- ======= Footer ======= --> */}
      <footer>
        <div className="footer-area">
          <div className="container">
            <div className="row">
              <div className="col-md-3">
                <div className="footer-content">
                  <div className="footer-head">
                    <div className="footer-logo">
                      <h2><span>C</span>ollegeify</h2>
                    </div>

                    <p>"The most innovative and advanced college society management app."</p>
                    <div className="footer-icons">
                      <ul>
                        <li>
                          <a href="#"><i className="bi bi-facebook"></i></a>
                        </li>
                        <li>
                          <a href="#"><i className="bi bi-twitter"></i></a>
                        </li>
                        <li>
                          <a href="#"><i className="bi bi-instagram"></i></a>
                        </li>
                        <li>
                          <a href="#"><i className="bi bi-linkedin"></i></a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              {/* <!-- end single footer --> */}
              <div className="col-md-3">
                <div className="footer-content">
                  <div className="footer-head">
                   <h3>
                   <div className="col-md-8">
                     <span>Contact us<hr></hr></span>
                     
                     </div>
                   </h3>
                    <div className="footer-contacts">
                      <p><span>Tel:</span> +91 7988369912</p>
                      <p><span>Email:</span> atulyadav9416@gmail.com</p>
                      <p><span>Working Hours:</span> 9am-5pm</p>
                    </div>
                  </div>
                </div>
              </div>
              {/* <!-- end single footer --> */}
              <div className="col-md-6">
                <div className="footer-content">
                <div class="embed-responsive embed-responsive-16by9 d-flex justify-content-center">
              <iframe class="embed-responsive-item shadow rounded" width="760" height="200" src="https://www.youtube.com/embed/6z7dYISoMqw?rel=0" title="Mnit Video" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen=""></iframe>
            </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="footer-area-bottom">
          <div className="container">
            <div className="row">
              <div className="col-md-12 col-sm-12 col-xs-12">
                <div className="copyright text-center">
                  <p>
                    &copy; Copyright <strong>Collegeify</strong>. All Rights Reserved
                  </p>
                </div>
                <div className="credits">
                  {/* <!--
              All the links in the footer should remain intact.
              You can delete the links only if you purchased the pro version.
              Licensing information: https://bootstrapmade.com/license/
              Purchase the pro version with working PHP/AJAX contact form: https://bootstrapmade.com/buy/?theme=eBusiness
            --> */}
                  Designed with  {' '}<i class="fa fa-heart" style={{'color':"red"}} aria-hidden="true"></i> {' '} by <a href="https://www.instagram.com/atulydv1364/">@atulydv1364</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
      {/* <!-- End  Footer --> */}
    </div>
  )
}

export default FooterComponent
