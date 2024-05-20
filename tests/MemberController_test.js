import { expect } from 'chai';
import sinon from 'sinon';
import * as MemberController from '../controllers/MemberController.js';
import Member from '../models/member.js';

describe('MemberController', function() {
  afterEach(function() {
    sinon.restore(); // Restore all stubs after each test
  });

  describe('getAllMembers', function() {
    it('should return all members', async function() {
      const members = [{ member_id: 1, name: 'Member 1' }, { member_id: 2, name: 'Member 2' }];
      sinon.stub(Member, 'getAllMembers').resolves(members);

      const req = {};
      const res = {
        json: sinon.spy(),
        status: sinon.stub().returnsThis(),
        send: sinon.spy()
      };

      await MemberController.getAllMembers(req, res);

      expect(res.json.calledWith(members)).to.be.true;
    });

    it('should handle errors', async function() {
      const error = new Error('Database error');
      sinon.stub(Member, 'getAllMembers').rejects(error);

      const req = {};
      const res = {
        json: sinon.spy(),
        status: sinon.stub().returnsThis(),
        send: sinon.spy()
      };

      await MemberController.getAllMembers(req, res);

      expect(res.status.calledWith(500)).to.be.true;
      expect(res.send.calledWith({ message: 'Failed to retrieve members', error })).to.be.true;
    });
  });

  describe('getMemberById', function() {
    it('should return the member with the given ID', async function() {
      const member = { member_id: 1, name: 'Member 1' };
      sinon.stub(Member, 'getMemberById').resolves(member);

      const req = { params: { id: 1 } };
      const res = {
        json: sinon.spy(),
        status: sinon.stub().returnsThis(),
        send: sinon.spy()
      };

      await MemberController.getMemberById(req, res);

      expect(res.json.calledWith(member)).to.be.true;
    });

    it('should return 404 if the member is not found', async function() {
      sinon.stub(Member, 'getMemberById').resolves(null);

      const req = { params: { id: 1 } };
      const res = {
        json: sinon.spy(),
        status: sinon.stub().returnsThis(),
        send: sinon.spy()
      };

      await MemberController.getMemberById(req, res);

      expect(res.status.calledWith(404)).to.be.true;
      expect(res.send.calledWith({ message: 'Member not found' })).to.be.true;
    });

    it('should handle errors', async function() {
      const error = new Error('Database error');
      sinon.stub(Member, 'getMemberById').rejects(error);

      const req = { params: { id: 1 } };
      const res = {
        json: sinon.spy(),
        status: sinon.stub().returnsThis(),
        send: sinon.spy()
      };

      await MemberController.getMemberById(req, res);

      expect(res.status.calledWith(500)).to.be.true;
      expect(res.send.calledWith({ message: 'Failed to retrieve member', error })).to.be.true;
    });
  });

  describe('addMember', function() {
    it('should add a new member', async function() {
      const member = { member_id: 1, name: 'Member 1' };
      sinon.stub(Member, 'addMember').resolves(member.member_id);

      const req = {
        body: { name: 'Member 1', address: 'Address 1', contact_details: '1234567890' }
      };
      const res = {
        json: sinon.spy(),
        status: sinon.stub().returnsThis(),
        send: sinon.spy()
      };

      await MemberController.addMember(req, res);

      expect(res.status.calledWith(201)).to.be.true;
      expect(res.json.calledWith({ message: 'Member added successfully', id: member.member_id })).to.be.true;
    });

    it('should handle errors', async function() {
      const error = new Error('Database error');
      sinon.stub(Member, 'addMember').rejects(error);

      const req = {
        body: { name: 'Member 1', address: 'Address 1', contact_details: '1234567890' }
      };
      const res = {
        json: sinon.spy(),
        status: sinon.stub().returnsThis(),
        send: sinon.spy()
      };

      await MemberController.addMember(req, res);

      expect(res.status.calledWith(500)).to.be.true;
      expect(res.send.calledWith({ message: 'Failed to add member', error })).to.be.true;
    });
  });

  describe('updateMember', function() {
    it('should update an existing member', async function() {
      const member = { member_id: 1, name: 'Updated Member', address: 'Updated Address', contact_details: '0987654321' };
      sinon.stub(Member, 'updateMember').resolves(1);
      sinon.stub(Member, 'getMemberById').resolves(member); // Ensure getMemberById resolves the member

      const req = {
        params: { id: 1 },
        body: { name: 'Updated Member', address: 'Updated Address', contact_details: '0987654321' }
      };
      const res = {
        json: sinon.spy(),
        status: sinon.stub().returnsThis(),
        send: sinon.spy()
      };

      await MemberController.updateMember(req, res);

      expect(res.send.calledWith({ message: 'Member updated successfully' })).to.be.true;
    });

    it('should handle errors', async function() {
      const error = new Error('Database error');
      sinon.stub(Member, 'updateMember').rejects(error);
      sinon.stub(Member, 'getMemberById').resolves({ member_id: 1 }); // Ensure getMemberById resolves the member

      const req = {
        params: { id: 1 },
        body: { name: 'Updated Member', address: 'Updated Address', contact_details: '0987654321' }
      };
      const res = {
        json: sinon.spy(),
        status: sinon.stub().returnsThis(),
        send: sinon.spy()
      };

      await MemberController.updateMember(req, res);

      expect(res.status.calledWith(500)).to.be.true;
      expect(res.send.calledWith({ message: 'Failed to update member', error })).to.be.true;
    });
  });

  describe('deleteMember', function() {
    it('should delete a member', async function() {
      sinon.stub(Member, 'deleteMember').resolves(1);
      sinon.stub(Member, 'getMemberById').resolves({ member_id: 1 }); // Ensure getMemberById resolves the member

      const req = { params: { id: 1 } };
      const res = {
        json: sinon.spy(),
        status: sinon.stub().returnsThis(),
        send: sinon.spy()
      };

      await MemberController.deleteMember(req, res);

      expect(res.send.calledWith({ message: 'Member deleted successfully' })).to.be.true;
    });

    it('should handle errors', async function() {
      const error = new Error('Database error');
      sinon.stub(Member, 'deleteMember').rejects(error);
      sinon.stub(Member, 'getMemberById').resolves({ member_id: 1 }); // Ensure getMemberById resolves the member

      const req = { params: { id: 1 } };
      const res = {
        json: sinon.spy(),
        status: sinon.stub().returnsThis(),
        send: sinon.spy()
      };

      await MemberController.deleteMember(req, res);

      expect(res.status.calledWith(500)).to.be.true;
      expect(res.send.calledWith({ message: 'Failed to delete member', error })).to.be.true;
    });
  });
});
