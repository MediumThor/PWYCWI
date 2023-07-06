import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import styled from 'styled-components';

const StyledText = styled.p`
  text-align: center;
  color: black;
`;

const StyledLink = styled.a`
  color: #0000EE;
  text-decoration: underline;
`;

const StyledTextBody = styled.p`
  text-align: center;
  color: black;
  margin-bottom: 20%;
`;

const StyledImage = styled.img`
  height: auto;
  width: 50%;
  padding-left: 10px;
  @media (max-width: 600px) {
    width: 25%;
  }
`;

const ImageWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 5%;
`;

const CenteredDialogTitle = styled(DialogTitle)`
  text-align: center;
`;

const BylawsDialog = ({ open, onClose, scroll }) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      scroll={scroll}
      aria-labelledby="scroll-dialog-title"
      aria-describedby="scroll-dialog-description"
      fullWidth={true} // Makes the dialog responsive
      maxWidth={"md"}
    >
      <CenteredDialogTitle id="scroll-dialog-title">By-Laws</CenteredDialogTitle>
      <DialogContent dividers={scroll === 'paper'}>

        <StyledText>
          <h1>PORT WASHINGTON YACHT CLUB</h1>
          <p>BY-LAWS as of March 9th, 2001</p>
          <h2>ARTICLE I PURPOSE AND NAME</h2>
          <h3>SECTION 1 PURPOSE</h3>
          <p>The purpose of the Port Washington Yacht Club, Inc. of Port Washington, Wisconsin (PWYC) is to serve the interest of boat owners, to act as a social and service club, to defend such owners against discriminatory legislation and burdensome taxation, to stimulate a greater interest in boating among all the citizens in the area served by the club, to provide a medium for the exchange of boating information, to provide for the dissemination of nautical knowledge in the sailing of various types of craft, to own or lease property for club uses, to purchase and sell real or personal property, and to do all other things which will tend to serve present owners of boating equipment and to further interest in boating generally.</p>
          <h3>SECTION 2 NAME</h3>
          <p>The name of this club shall be “The Port Washington Yacht Club, Inc.” and its location shall be in the City of Port Washington, County of Ozaukee, and State of Wisconsin.</p>
          <h2>ARTICLE II MEMBERSHIP</h2>
          <h3>SECTION 1 ELIGIBILITY</h3>
          <p>Membership shall be open to all applicants at least 21 years of age who are interested in boating. Subject to the further provisions of these By-Laws, membership shall be granted to individuals on a non- discriminatory basis without regard to race, color, sex, religious affiliation or beliefs.</p>
          <h3>SECTION 2 CLASSES</h3>
          <p>The following member classes shall constitute this club's general membership.</p>
          <p>a. REGULAR FAMILY MEMBERS</p>
          <p>Regular Family Members shall have all rights and privileges of club membership including the right to vote, to hold office, and to serve on any committee.</p>
          <p>b. LIFE MEMBERS</p>
          <p>Any Regular Family Member who shall have been a Regular Family Member for 25 consecutive years, excluding years on leave of absence, and who shall be a Regular Family Member in good standing at the expiration of said 25 years, shall be eligible for and entitled to Life Membership. Life Members may vote, hold any office in the club, serve on any committee and shall be entitled to enjoy all the club privileges.</p>
          <p>c. NON-RESIDENT MEMBERS</p>
          <p>Any Regular Family Member, whose principal residence is located outside of two hundred land miles from the club, shall be eligible for Non- Resident Membership. A Non-Resident Member shall not be entitled to vote, nor hold any office in the club, nor serve on any standing committee. However, such members shall be entitled to enjoy all other club privileges.</p>
          <p>d. HONORARY MEMBERS</p>
          <p>Honorary Members of the club shall be approved by the Board of Directors upon motion and a two-thirds vote. Not less than thirty days prior to the Annual Meeting, a list of proposed Honorary Members shall be brought before the Board of Directors and it shall be posted for member comments and recommended additions to the list if any. At the first meeting of the Board of Directors following the Annual Meeting, the Board shall approve Honorary Members for the coming year. Honorary Memberships shall be for one year and expire on the Annual Meeting date. Honorary Members shall not be eligible to vote, nor hold any office, nor serve on any standing committee. However, Honorary Members shall be entitled to enjoy all other privileges of the club.</p>
          <h3>SECTION 3 PROCEDURES</h3>
          <p>The procedure to become a member is as follows.</p>
          <p>a. The applicant shall apply for membership by completing an application form of a type approved by the Board of Directors.</p>
          <p>b. The application must be signed by two voting members, not in the same household, as sponsors of the applicant.</p>
          <p>c. The application shall be delivered to the club Treasurer together with all required fees.</p>
          <p>d. The application shall then be posted on the club bulletin board for a period of 30 days.</p>
          <p>e. At the first regular Board meeting after the application posting time has expired, the Board, upon motion, shall vote to approve or disapprove the applicant for membership. The Board may table action on an application until the next regular Board meeting once. Inaction by the Board after tabling shall constitute disapproval of the application.</p>
          <p>Board approval shall indicate the membership class. A membership card shall be issued accordingly to the new member.</p>
          <h3>SECTION 4 VOTING PRIVILEGES</h3>
          <p>For the time that a person is a member of the Port Washington Yacht Club, in good standing, this person and one other person over the age of 21 years and residing in the same household shall be considered voting members of PWYC.</p>
          <p>a. Voting members shall be defined as those named on the current membership roster.</p>
          <p>b. Both persons shall count as individuals in matters for which it is determined that a quorum must be present.</p>
          <p>c. Both persons shall have one vote each in matters for which it is determined a vote must be taken.</p>
          <p>d. There shall be a limit of two (2) votes per household.</p>
          <p>e. Only one notice of any club matter or function requiring notice shall be sent to a household.</p>
          <h3>SECTION 5 RESIGNATION</h3>
          <p>A member may resign from the club at any time upon notice in writing addressed to a club officer. A member who resigns shall not be entitled to any refund of dues, special assessment or other club fee.</p>
          <h3>SECTION 6 LEAVES OF ABSENCE</h3>
          <p>Any member who wishes a leave of absence shall make application to the Board of Directors, setting forth the reason(s) for such request.</p>
          <p>a. The Board shall have the power to grant leaves of absence to any member for such reason(s) as it shall deem proper, for periods not exceeding one (1) year in length.</p>
          <p>b. Upon further application by such member, such leaves may be extended by the Board for additional periods not to exceed one (1) year each.</p>
          <p>c. During a member's leave of absence he/she shall not be liable for fees or assessments.</p>
          <p>d. Members on leave of absence wishing reinstatement shall make application to the Board and shall pay the current applicable dues and shall also pay any and all assessments levied during their leave, before being returned to active membership status.</p>
          <h3>SECTION 7 TERMINATION</h3>
          <p>a. Membership in the club may be terminated by action of the Board of Directors for nonpayment of dues 90 days after said dues are due and owing. Termination shall not release the terminated member from the obligation to pay all dues owed prior to his/her termination.</p>
          <p>b. Membership in the club may also be terminated for any reason whatsoever by a three-quarter (3/4) vote of all of the members of the club at any regular or Special Meeting of the members.</p>
          <h3>SECTION 8 WORK CREDIT HOURS</h3>
          <p>a. For voluntary services performed on behalf of the PWYC and its activities, work time, called work credit hours, may be credited against a member's annual dues.</p>
          <p>b. Work credit hours are not transferable to other members.</p>
          <p>c. Work credit hours may be used only in the year the work was performed.</p>
          <p>d. The Board of Directors shall set a maximum number of hours allowed to be credited against annual dues and set the hourly rate used for calculating work credit.</p>
          <p>e. The Board shall also approve what work qualifies for work hour credit.</p>

          <h2>ARTICLE III FISCAL YEAR</h2>

          <h3>SECTION 1</h3>
          <p>The fiscal year of the club shall commence on the first day of January and end on the thirty-first day of December.</p>

          <h2>ARTICLE IV DUES AND FEES</h2>

          <h3>SECTION 1 PAYABLE</h3>
          <p>Annual dues shall be due and payable on January 1st of each year. The names of members who are over 30 days delinquent may be posted on the club bulletin board.</p>

          <h3>SECTION 2 DETERMINATIONS</h3>
          <p>The annual dues, initiation fees, and building assessments for Regular Family Members of the club and methods of payment for each shall be determined at each Annual Meeting of the members.</p>

          <h3>SECTION 3 NEW MEMBERS</h3>
          <p>To be issued a membership card, an approved applicant must pay the following fees.</p>
          <p>a. The initiation fee, to be submitted with the application.</p>
          <p>b. A pro-rata amount of dues for the current year from the date of approval to the next January 1st; paid when notified of acceptance.</p>
          <p>c. Any building assessments; paid when notified of acceptance.</p>

          <h3>SECTION 4 SPECIAL ASSESSMENTS</h3>
          <p>Special assessments may become necessary because of unforeseen circumstances. These special assessments shall be voted upon at the earliest possible general membership meeting.</p>

          <h3>SECTION 5 LIFE MEMBERS</h3>
          <p>Life Members shall be exempt from paying annual dues, but shall be responsible for any special assessments approved.</p>

          <h3>SECTION 6 NON-RESIDENT MEMBER</h3>
          <p>Non-Resident Members shall be charged dues at the rate of one-third (1/3) of the Regular Family Member dues. Non-Resident Members shall be exempt from all special assessments.</p>

          <h3>SECTION 7 HONORARY MEMBERS</h3>
          <p>Honorary Members shall be exempt from all dues, fees and special assessments.</p>

          <h3>SECTION 8 MEMBERSHIP REAPPLICATION</h3>
          <p>A member re-applying for membership, who had resigned in good standing, no more than five years prior, shall be liable for all incremental building assessments and special assessments that occurred during their absence. After five years, new membership procedures shall be followed.</p>

          <h2>ARTICLE V MEETINGS</h2>

          <h3>SECTION 1 ANNUAL MEMBERSHIP</h3>
          <p>The Annual Meeting of the members shall be held on the second Friday of November of each year for the purpose of electing club directors and officers, to act on matters as required by these By-Laws, and to consider other business as may come before such meeting.</p>
          <h3>SECTION 2 REGULAR MEMBERSHIP</h3>
          <p>
            Except if changed by majority vote of the Board of Directors and the members given thirty (30) days notice of such change, regular meetings of the members of the club shall be held on the second Friday of each month, except for December when no meeting shall be held. The Annual Meeting of the members shall be a regular meeting.
          </p>

          <h3>SECTION 3 NOTICE</h3>
          <p>
            a. Written notices of the time, place, and day of the Annual Meeting and of all regular membership meetings shall be announced to the membership in the club newsletter.
          </p>
          <p>
            b. The members shall be notified in writing by mail of the time, place, purpose, and business to be considered at any Special Meeting of members at least fourteen days before such meeting.
          </p>

          <h3>SECTION 4 SPECIAL</h3>
          <p>
            Special Meetings of the membership may be called by the Board of Directors either by their own action or upon written request to the Board of Directors by ten percent of the Regular and Life Members.
          </p>

          <h3>SECTION 5 QUORUM</h3>
          <p>
            Ten per cent of the members shall constitute a quorum. Any action taken at a regular meeting shall require a majority vote of those present.
          </p>

          <h2>ARTICLE VI - MANAGEMENT</h2>

          <h3>SECTION 1 CLUB OPERATIONS</h3>
          <p>
            The management of the club shall be vested in the Board of Directors who shall have the power to expend the sum of not more than $500.00 beyond normal approved expenses at any Board meeting, and shall in all other respects manage the affairs of the club.
          </p>

          <h3>SECTION 2 EMPLOYEES</h3>
          <p>
            The Board may employ whatever personnel they deem necessary and for which funds are available, to aid in the management of the club.
          </p>

          <h3>SECTION 3 EMERGENCY EXPENDITURES</h3>
          <p>
            In the event an emergency expenditure of club funds is deemed necessary for repairs, the approval of not less than two (2) officers shall be required to make such expenditure.
          </p>

          <h3>SECTION 4 USE OF CLUB FACILITIES</h3>
          <p>
            The Board of Directors shall establish all rules governing member and guest conduct during member and guest use of PWYC facilities.
          </p>

          <h2>ARTICLE VII - BOARD OF DIRECTORS</h2>

          <h3>SECTION 1 COMPOSITION</h3>
          <p>
            a. The Board of Directors shall consist of eight (8) voting directors. Six (6) directors shall be elected at the Annual Meeting of the membership and shall hold office until their successors are elected. Two (2) directors shall be the immediate past Commodores.
          </p>
          <p>
            b. Three directors shall be elected each year to a two (2) year term. The outgoing Commodore shall serve a two year term.
          </p>
          <p>
            c. No person shall be eligible for election as a director unless such person shall have been a Regular Family Member for a period of at least one (1) year, or is a Life Member of the club, and at the time of the election is a member in good standing.
          </p>

          <h3>SECTION 2 VACANCY</h3>
          <p>
            If a vacancy on the Board occurs for any reason, the Board shall fill such vacancy at the earliest possible opportunity. The general membership at a meeting shall nominate member(s) to fill the vacancy. The vacancy shall be filled by a majority of affirmative vote the members present at the meeting. Members elected to fill such a vacancy shall be a director for the duration of the vacated position.
          </p>

          <h3>SECTION 3 QUORUM</h3>
          <p>
            Five voting members of the Board shall constitute a quorum at all Board meetings.
          </p>

          <h3>SECTION 4 REGULAR MEETINGS</h3>
          <p>
            Regular meetings of the Board of Directors shall be held monthly at a time and place designated by the Commodore.
          </p>

          <h3>SECTION 5 SPECIAL MEETINGS</h3>
          <p>
            Special Meetings of the Board of Directors may be called by the Commodore, notice of which shall be given to Board members in sufficient time to permit all members to be present.
          </p>

          <h3>SECTION 6 RULES OF CONDUCT</h3>
          <p>
            The Board shall conduct business under the current edition of Robert's Rules of Order, but may adopt other written rules of procedure by majority affirmative vote.
          </p>

          <h3>SECTION 7 ATTENDANCE</h3>
          <p>
            Any member of the Board who expects to be absent from any Board meeting shall, when possible, notify the Commodore or Secretary of that fact prior to the applicable meeting. Any Board member who shall have been absent from three consecutive regular monthly Board meetings without a reasonable excuse satisfactory to a majority of the other directors shall be deemed to have resigned as a club director, and the office held by such member shall immediately be declared vacant.
          </p>

          <h2>ARTICLE VIII CLUB OFFICERS</h2>

          <h3>SECTION 1 ELECTED OFFICERS</h3>
          <p>
            PWYC officers to be elected by the club members shall be, Commodore, Vice Commodore, Rear Commodore, Treasurer, Secretary, and Fleet Captain.
          </p>

          <h3>SECTION 2 ELECTIONS</h3>
          <p>
            The club officers shall be elected by the voting members at the Annual Meeting and shall take office at the Change-of-Watch ceremony prior to January 1 of the New Year. The officers shall hold office until the next Change-of-Watch.
          </p>

          <h3>SECTION 3 ELIGIBILITY</h3>
          <p>
            Persons who have been a Regular Family Member for two years or is Life Member, and are at the time of nomination a member in good standing are qualified to be a club officer.
          </p>

          <h3>SECTION 4 ATTENDANCE AND VOTING</h3>
          <p>
            Each officer shall attend meetings of the Board. Except for the Commodore, club officers shall not have voting privileges at such meetings. Any officer who expects to be absent from any Board meeting shall, when possible, notify the Commodore or Secretary of that fact prior to the applicable meeting. Any officer member who shall have been absent from three consecutive regular monthly Board meetings without a reasonable excuse satisfactory to a majority of the directors shall be deemed to have resigned as a club officer, and the office held by such member shall immediately be declared vacant.
          </p>

          <h3>SECTION 5 COMMODORE</h3>
          <p>
            The Commodore shall be the chief executive officer of the club and shall enforce the rules and general provisions respecting the conduct of members and the welfare of the club, and shall preside at all meetings of members of the Board of Directors and meeting of the general membership. The Commodore shall be an ex-officio member of all committees. The Commodore shall, subject to the approval of the Board of Directors, appoint the members of the Standing Committees (except the Nominating Committee) and such other committees as the Board of Directors may authorize. From time to time, the Commodore may appoint and send delegates or representatives of the club to any meeting, convention, regatta, or appropriate regional yachting organization. With the Secretary, the Commodore shall sign all written contracts and obligations of the club which have been approved by the Board of Directors. In the event of a tie vote by the Board of Directors, the Commodore shall cast the deciding vote. At all other times, the Commodore shall have no voting privilege in matters before the Board of Directors.
          </p>

          <h3>SECTION 6 VICE COMMODORE</h3>
          <p>
            The Vice Commodore shall perform such duties as from time to time are prescribed by the Board of Directors, and in the absence of the Commodore, shall perform the duties of that office. The Vice Commodore shall be chairperson of the Buildings and Grounds Committee.
          </p>

          <h3>SECTION 7 REAR COMMODORE</h3>
          <p>
            The Rear Commodore shall perform such duties as from time to time shall be prescribed by the Board of Directors, and in the absence of the Vice Commodore, shall perform the duties of that office. The Rear Commodore shall be chair of the House Committee and Social Committee.
          </p>

          <h3>SECTION 8 SECRETARY</h3>

          <p>The Secretary shall keep the minutes of the meetings of the Board of Directors and the general membership, and such minutes’ at all reasonable times shall be open to the inspection of any Regular Family Member or Life Member. The Secretary shall issue notice of all meetings of the club, act as custodian and keeper of all club minutes and correspondence and the club seal, shall sign with the Commodore all written contracts and obligations which have been approved by the Board of Directors, and shall perform other such duties as from time to time may be prescribed by the Board of Directors. The Secretary shall coordinate with the Commodore, publication of the club newsletter. The Secretary shall receive financial credit toward club dues during his/her term of office as determined by the Board of Directors.</p>


          <h3>SECTION 9 TREASURER</h3>

          <p>The Treasurer shall receive all dues and funds of the club and shall keep books of account, which shall at all reasonable times be open for inspection by any member of the Board of Directors or any appropriate committee. The Treasurer shall deliver to his/her successor, books and all funds and property of the club in his/her custody. The Treasurer shall deposit the money of the club in a bank or banks approved by the Board of Directors. The Treasurer shall make for the monthly meeting, a statement of the club's financial condition. Such reports shall be filed with the Secretary. The Treasurer shall be Chairperson of the Finance Committee. The Treasurer shall be responsible for the rendering of all statements for accounts receivable, dues, assessments, and other charges. The Treasurer may be bonded by the club in an amount set by the Board of Directors. The expense of the bond shall be borne by the club. The Treasurer shall receive financial credit toward dues during his/her term of office as determined by the Board of Directors.</p>
          <h3>SECTION 10 FLEET CAPTAIN</h3>

          <p>The Fleet Captain shall notify applicants of their election to membership, issue notification of termination of membership, and keep a roll of members of the club. The Fleet Captain shall be the Chairperson of the Membership Committee, and shall annually coordinate the publication of the Membership Roster. The Fleet Captain shall report to the Board of Directors on the club's boating activities and shall coordinate with chairpersons assisting in these club functions.</p>

          <h3>SECTION 11 VACANCIES</h3>

          <p>If a vacancy occurs in any elected office, for any reason, the general membership shall nominate member(s) to fill the vacancy at the earliest possible opportunity. The vacancy shall be filled by the nominee receiving a majority affirmative vote of the members present at the general membership meeting. The successor so chosen shall serve for the unexpired term of the vacated position.</p>

          <h2>ARTICLE IX COMMITTEES</h2>

          <h3>SECTION 1 GENERAL</h3>
          <p>
            All committees (except the nominating committee) shall be appointed upon the recommendation of the Commodore and be subject to Board approval. All committees shall have such powers and duties as may be conferred upon them by these By-Laws, or by the Board. All action taken by any committee (except the nominating committee) shall be subject to prior Board approval. Committees shall not obligate the club in any indebtedness not authorized by the club budget or approved by the Board. The standing committees of the club shall be the House Committee, the Building and Grounds Committee, the Membership committee, the Social Committee, the Finance Committee, the Nominating Committee, and the Fish Day Committee. The general committees of the club shall be the Youth Sailing Committee, the Sail/Race Committee, and all other club committees as may be approved by the Board.
          </p>

          <h3>SECTION 2 BUILDING AND GROUNDS</h3>
          <p>
            The Building and Grounds Committee shall be responsible for the maintenance, repair, replacement and enhancement of the club's property and facilities, including major fixed assets, equipment, furnishings and fixtures so that the same is maintained in good operating condition and adequate to the needs of the membership. The Buildings & Grounds Committee shall establish a sub-committee for the express purpose of raising and dismantling the tent on the occasions when the tent is needed for club activities. It shall receive and redress complaints regarding matters coming under its jurisdiction.
          </p>

          <h3>SECTION 3 HOUSE</h3>
          <p>
            The House Committee shall be responsible for the operation of the galley and bar, purchasing and accounting for all consumable items purchased by the club. It shall enforce rules for the conduct of the members and their use of the club premises. It shall receive and redress complaints regarding matters coming under its jurisdiction.
          </p>

          <h3>SECTION 4 SOCIAL</h3>
          <p>
            The Social Committee shall organize and arrange for all social and entertainment functions for the club within the approved budget. The Social Committee shall arrange for and manage such dinners, dances, parties, and other social functions as in its judgment will be conducive to the welfare of the club and the recreation of the members.
          </p>

          <h3>SECTION 5 FINANCE</h3>
          <p>
            The Finance Committee shall have supervision over the preparation of the budget for the next ensuing year which shall be submitted to the Board for its approval. The Finance committee, at the request of the Board, shall prepare such plans for the financing of the club's activities and/or its fixed and capital assets. It shall be responsible for supervising the club's accounts and accounting statements and to advise the Treasurer on financial matters.
          </p>

          <h3>SECTION 6 MEMBERSHIP</h3>
          <p>
            The Membership Committee shall have the duty and such powers as may be necessary or appropriate to enable the Membership Committee to investigate the qualifications of all applicants for membership in the club. The Membership Committee shall investigate and pass upon the qualifications of all candidates for membership, or reinstatement to membership and report their recommendations to the Board through the Secretary. It shall be their duty to stimulate and encourage members to secure new applications for membership in the club.
          </p>

          <h3>SECTION 7 NOMINATING</h3>
          <p>
            The Nominating Committee shall be responsible for nominating one slate of officers and directors to be voted upon at the Annual Member's meeting. This committee shall submit its report at the October meeting of club members each year and the recommended slate shall be posted on the club's bulletin board and published in the club newsletter. The Nominating Committee shall consist of not less than three, no more than five Regular Family and/or Life Members. The immediate Past Commodore shall chair and select Nominating Committee members. Except for the immediate Past Commodore, the current Board members and spouses of current Board members shall not be eligible to serve on this committee. Members of this committee and their spouses shall not be eligible for nomination by this committee.
          </p>

          <h3>SECTION 8 FISH DAY</h3>
          <p>
            The Fish Day Committee shall have such duties and responsibilities as may from time to time be established by the Board.
          </p>

          <h3>SECTION 9 OTHER</h3>
          <p>
            The Board may from time to time create such other committees with such duties and responsibilities as the Board may deem necessary or appropriate.
          </p>

          <h2>ARTICLE X INDEMNIFICATION OF OFFICERS AND DIRECTORS</h2>
          <h3>SECTION 1</h3>
          <p> Every person who is or was a director, officer or committee member of the club, together with their heirs and personal representatives, shall be indemnified by the club against all loss, costs, damages and expenses, including reasonable attorney's fees, assessed against, incurred by or imposed upon him/her in connection with or resulting from any claim, action, suit or proceeding; including criminal proceedings, to which he/she is made or threatened to be made a party by reason of his/her being or having been such director or officer, except as to matters as to which he/she shall be finally adjudged in such action, suit or proceeding to be liable for gross negligence or willful misconduct. All liability, loss, damage, costs and expense incurred or suffered by the club by reason or arising out of or in connection with the foregoing indemnification shall be treated and handled by the club as a common expense.</p>
          <h2>ARTICLE XI LAKE MICHIGAN YACHTING ASSOCIATION</h2>

          <h3>SECTION 1</h3>

          <p>As a member of the Lake Michigan Yachting Association, the Port Washington Yacht Club shall recognize all other Lake Michigan Yachting Association members and welcome them as guests in our clubhouse.</p>

          <h2>ARTICLE XII BY-LAW AMENDMENTS</h2>
          <h3>SECTION 1 AMENDMENTS</h3>
          <p>These By-Laws may be amended at any meeting of the membership of the club by a two-thirds (2/3) affirmative vote of the voting members attending such meeting, providing that notice of such proposed amendment or amendments shall have been mailed to each member ninety (90) days prior to final consideration, along with the notice of the meeting at which the amendment or amendments are to be considered.</p>

          <h3>SECTION 2 PRIOR BY-LAWS</h3>

          <p>Upon adoption of these By-Laws all previous By-Laws and amendments thereto are hereby repealed.</p>

          <h2>ARTICLE XIII DISSOLUTION OF ASSETS</h2>
          <h3>SECTION 1 DISSOLUTION</h3>
          <p>In the event the organization is dissolved, all assets shall be liquidated to pay any outstanding debt and balance there after to be distributed between all current regular and life members based on proration of full years of tenure.</p>




        </StyledText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
};

export default BylawsDialog;
