import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import SearchBox from '../search-box'
import './home-banner.scss'

export default class HomeBanner extends React.Component {

  scrollToAbout() {
    const top = document.getElementById('banner-home').clientHeight;
    const offset = document.querySelector('header nav.main').clientHeight;
    window.scrollTo({
      top: top - offset,
      behavior: 'smooth'
    });
  }

  get browseDropdown() {
    return (
      <div className="browse">
        Or
        <br/>
        <select onChange={this.props.onBrowseByEntityChange}>
          <option>{this.props.browseByText}</option>
          <option value="All">All</option>
          {this.props.entities && this.props.entities.map(entity => {
            return <option value={entity.acronym}>{entity.name}</option>
          })}
        </select>
      </div>
    )
  }

  get verticalRow() {
    if (this.props.helpWantedTitle || this.props.helpWantedDescription) {
      return <div className="vertical-row" ></div>
    }
    return null
  }

  get helpWantedTitleSubsection() {
    if (this.props.helpWantedTitle) {
      return <div className="banner-subsection-title">{this.props.helpWantedTitle}</div>
    }
  }

  get helpWantedDescriptionSubsection() {
    if (this.props.helpWantedDescription) {
      return <div className="banner-subsection-subtitle">{this.props.helpWantedDescription}</div>
    }
    return null
  }

  get helpWantedButtonSubsection() {
    if (this.props.helpWantedButton) {
      return (
        <div className="buttons">
            <Link to="/help-wanted">
              <button className="alt">{this.props.helpWantedButton}</button>
            </Link>
        </div>
      )
    }
    return null
  }

  get searchDescriptionSection() {
    return (
      <Fragment>
        {this.props.searchDescriptionText &&
          <div className="show-w-gt-800">{this.props.searchDescriptionText}</div>
        }
        {this.props.searchDescriptionTextMobile &&
          <div className="show-w-lte-800">{this.props.searchDescriptionTextMobile}</div>
        }
      </Fragment>
    )
  }

  get issueSection() {
    if (this.props.issueUrl) {
      return (
        <div className="indented">
          <br/>
          <br/>
          <div className="banner-subsection">
            <div className="banner-subsection-subtitle" id="issue-banner-subsection-subtitle">
              <img className="chat" src="/assets/img/icons/chat_bubble.png" />
              <span>Have questions or feedback? Open an issue on our open source repository <a className="link" href={this.props.issueUrl} id="issue-link" target="_blank">here</a>.</span>
            </div>
          </div>
        </div>
      )
    }
    return null
  }

  render() {
    console.log("this.props.backgroundImage:", this.props.backgroundImage)
    console.log("this.props.searchPlaceholder:", this.props.searchPlaceholder)
    const sectionStyle = {
      backgroundImage: `url('${this.props.backgroundImage}')`
    }
    return (
      <section id="banner-home" className="banner large" style={sectionStyle}>
        <div className="banner-content">
          <div className="banner-title">{this.props.motto}</div>
          <div className="banner-subtitle show-w-gt-1200">{this.props.subtitle}</div>
          <div className="indented">
            <div className="banner-subsection width-half" style={{zIndex: 30}}>
              <div className="banner-subsection-content">
                <div className="banner-subsection-content-padder">
                  <div className="search-input-container">
                    <div className="search-input-wrapper">
                      <div className="search-description-wrapper">
                        {this.searchDescriptionSection}
                      </div>
                      <div className="search-input-and-button-wrapper">
                        <SearchBox
                          placeholder={this.props.searchPlaceholder}
                        />
                      </div>
                    </div>
                  </div>
                  {this.browseDropdown}
                </div>
              </div>
            </div>

            {this.verticalRow}

            <div className="banner-subsection show-w-gt-600 width-half" id="banner-subsection-engage">
              <div className="banner-subsection-content">
                <div className="banner-subsection-content-padder">
                  {this.helpWantedTitleSubsection}
                  {this.helpWantedDescriptionSubsection}
                  {this.helpWantedButtonSubsection}

                </div>
              </div>
            </div>
          </div>
          {this.issueSection}
        </div>

        <a
          className="scroll-indicator"
          title="Scroll Down"
          onClick={this.scrollToAbout}
        >
          <i className="icon icon-angle-down"></i>
        </a>

      </section>
    )
  }
}
