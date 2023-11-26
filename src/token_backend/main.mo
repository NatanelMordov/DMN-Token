import Principal "mo:base/Principal";
import Nat "mo:base/Nat";
import Text "mo:base/Text";
import HashMap "mo:base/HashMap";
import Debug "mo:base/Debug";
import Iter "mo:base/Iter";


actor Token{
  var owner : Principal = Principal.fromText("b2ljk-ymc7j-dgo7o-igree-by37l-qefh3-v3coo-khkqh-imfsd-eajr6-tqe");
  var totalSupply : Nat = 1000000000;
  var symbol : Text="DMN";

  private stable var balancesEntry: [(Principal, Nat)]=[];

  private var balances = HashMap.HashMap<Principal, Nat>(5, Principal.equal, Principal.hash);
  

  public query func balanceOf(who: Principal) : async Nat {
    var balance : Nat = switch (balances.get(who)) {
      case null 0;
      case (?result) result;
    };
    return balance;
  };

  public query func getSymbol(): async Text{
    return symbol;
  };

  public shared(msg) func payOut(): async Text{
    //Debug.print(debug_show(msg.caller));
    if(balances.get(msg.caller)==null){
    let amount= 10000;
    let result=await transfer(msg.caller, amount);
    return result;
    }else{
      return "Already Claimed";
    }
  };

  public shared(msg) func transfer(to: Principal, amount: Nat) : async Text{
    let fromBalance= await balanceOf(msg.caller);
    if(fromBalance > amount){
      let newFromBalance : Nat= fromBalance-amount;
      balances.put(msg.caller, newFromBalance);

      let toBalance= await balanceOf(to);
      let newToBalance : Nat= toBalance+amount;
      balances.put(to, newToBalance);
      
      return "Success";
    }else{
      return "Insufficient Funds";
    }

  };

  system func preupgrade(){
    balancesEntry := Iter.toArray(balances.entries());
  };

  system func postupgrade(){
    balances := HashMap.fromIter<Principal, Nat>(balancesEntry.vals(),1,Principal.equal, Principal.hash);
    if(balances.size() < 1){
      balances.put(owner, totalSupply);
    };
  };

};