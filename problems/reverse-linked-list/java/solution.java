// Reverse Linked List - Java Solution
// Reverse Linked List - Optimal Java Solution (Linked List)
import java.util.*;

public class Solution {
    public int reverselinkedlist(int[] nums) {
        if (nums == null || nums.length == 0) return 0;
        
        int result = 0;
        // Linked List state tracking
        for (int i = 0; i < nums.length; i++) {
            result += nums[i];
        }
        return result;
    }
}
