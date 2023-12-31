<template>
  <div>
    <footer height="266px" class="text-center text-lg-start text-muted">
      <section class="d-flex justify-content-center justify-content-lg-between">
        <div>
          <a href="" class="me-4 text-reset">
            <i class="fab fa-facebook-f"></i>
          </a>
          <a href="" class="me-4 text-reset">
            <i class="fab fa-twitter"></i>
          </a>
          <a href="" class="me-4 text-reset">
            <i class="fab fa-google"></i>
          </a>
          <a href="" class="me-4 text-reset">
            <i class="fab fa-instagram"></i>
          </a>
          <a href="" class="me-4 text-reset">
            <i class="fab fa-linkedin"></i>
          </a>
          <a href="" class="me-4 text-reset">
            <i class="fab fa-github"></i>
          </a>
        </div>
      </section>
      <section class="">
        <div class="container text-center text-md-start mt-5">
          <div class="row mt-3">
            <div class="col-md-1 col-lg-2 col-xl-2 mx-auto mb-4">
              <h6 class="text-uppercase fw-bold mb-4">Company</h6>
              <p>
                <a href="#!" class="text-reset">About us</a>
              </p>
              <p>
                <a href="#!" class="text-reset">Contact us</a>
              </p>
              <p>
                <a href="#!" class="text-reset">Company</a>
              </p>
            </div>

            <div class="col-md-2 col-lg-2 col-xl-2 mx-auto mb-4">
              <h6 class="text-uppercase fw-bold mb-4">Help</h6>
              <p>
                <a href="#!" class="text-reset">Subscription Instruction</a>
              </p>
              <p>
                <a href="#!" class="text-reset">Help Center</a>
              </p>
              <p>
                <a href="#!" class="text-reset">Problem with Site</a>
              </p>
            </div>

            <div class="col-md-3 col-lg-2 col-xl-2 mx-auto mb-4">
              <h6 class="text-uppercase fw-bold mb-4">User</h6>
              <p>
                <a href="#!" class="text-reset">Pricing</a>
              </p>
              <p>
                <a href="#!" class="text-reset">Settings</a>
              </p>
              <p>
                <a href="#!" class="text-reset">Orders</a>
              </p>
              <p>
                <a href="#!" class="text-reset">Help</a>
              </p>
            </div>
            <div class="col-md-4 col-lg-2 col-xl-2 mx-auto mb-4">
              <h6 class="text-uppercase fw-bold mb-4">Follow us</h6>
              <p>
                <a href="facebook.com" class="text-reset">Facebook</a>
              </p>
              <p>
                <a href="instagram.com" class="text-reset">Instagram</a>
              </p>
              <p>
                <a href="twitter.com" class="text-reset">Twitter</a>
              </p>
            </div>
            <div class="col-md-5 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">
              <h6 class="text-uppercase fw-bold mb-4">Contact</h6>
              <v-text-field
                label="Enter Email Here"
                placeholder="Enter Email here"
                variant="outlined"
              ></v-text-field>
              <v-btn class="white --text" block color="#8E0000"
                ><span>Submit</span></v-btn
              >
            </div>
          </div>
        </div>
      </section>
    </footer>
  </div>
</template>

<script>
export default {
  name: "FooterComponent",
};
</script>
<style scoped>
* {
  text-decoration: none;
}
h6 {
  color: #494949;
}
span {
  color: white;
}
</style>
