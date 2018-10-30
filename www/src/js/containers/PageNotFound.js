/**
 * Created by stephenhamilton on 24/02/2017.
 */
import { TweenLite } from 'gsap/TweenLite';
import { CSSPlugin } from 'gsap/CSSPlugin';
import React, { Component } from 'react';
import { get_base_assets_path } from 'constants/AppConstants';
import { connect } from 'react-redux';
import { selectCategory, selectYear } from 'store/categories/categoriesActions';
import { getItemIsInValid } from 'store/item/itemSelectors';

class PageNotFound extends Component {
  componentDidMount() {
    const plugins = [CSSPlugin]; // stop treeshaking :https://greensock.com/docs/NPMUsage
    TweenLite.to(this.item_ref, 0.3, { opacity: 1, ease: Power1.easeIn });
  }

  render() {
    const BASE_ASSETS_URL = get_base_assets_path();
    const opacity = { opacity: 0 };

    return (
      <div class="main_region" ref={(item) => (this.item_ref = item)} style={opacity}>
        <div class="aboutme">
          <div class="row">
            <div class="col">
              <div class="page-header">
                <h1>Ooooops....</h1>
              </div>
            </div>
          </div>

          <div class="row justify-content-around">
            <div class="col-md-12">
              <img
                crossOrigin="anonymous"
                width="147"
                height="303"
                className="img-fluid float-left ml-3 pr-5"
                alt="Profile image"
                src={BASE_ASSETS_URL + '/images/about/profile.png'}
              />
              <p class="lead">Error here.</p>
            </div>
          </div>

          <div class="details-seperator" />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {
    selectCategory: (category_id) => {
      dispatch(selectCategory(category_id));
    },
    selectYear: (year_id) => {
      dispatch(selectYear(year_id));
    },
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PageNotFound);
